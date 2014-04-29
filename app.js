var express = require('express'),
    app = express(),
    prediction = require('predictionio-client'),
    hogan = require('hogan.js'),
    fs = require('fs'),
    path = require('path'),
    http = require('http');

prediction.config.APP_KEY = 'mKN52XibH4Ja1LnjQTHixw896xy7lBanjVBMsivu45sRItenjR4widGs1XZf0Fzo';
prediction.config.APP_URL = 'http://localhost:8000' // default

// var views = {};

// function loadView(name) {
//     fs.readFile(__dirname+'/views/'+name+'.html', function (err, data) {
//         if (err) {
//             console.error("Can't load fixtures: ", e);
//             return;
//         }
//         views[name] = hogan.compile(data.toString());
//     });
// }
// loadView('layout');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'html');
app.set('layout', 'layout');
// app.set ('partials', {foo: 'foo'});
app.enable('view cache');
app.engine('html', require('hogan-express'));
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(express.static(path.join(__dirname, 'web')));

app.get('/', function (req, res) {
    res.render('index', {});
});
app.post('/user', function (req, res) {
    var user = req.body.user;
    prediction.user.createUser(user, function (x, data) {
        res.send({ message: 'The user "'+user+" has been created."});
    });
});
app.post('/show', function (req, res) {
    var user = req.body.user;
    var show = req.body.show;
    prediction.item.createItem(show, 'show', function () {
        prediction.action.like(user, show, function() {
            res.send({ message: 'You liked "'+show+'".'});
        });
    });
});
app.post('/recommend', function (req, res) {
    var user = req.body.user;
    prediction.engine.recommendedItems('itemrec', user, 5, function (x, data) {
        res.send(data.pio_iids);
    });
})

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
