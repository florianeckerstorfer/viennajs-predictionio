var fs = require('fs');
var prediction = require('predictionio-client');

prediction.config.APP_KEY = 'mKN52XibH4Ja1LnjQTHixw896xy7lBanjVBMsivu45sRItenjR4widGs1XZf0Fzo';
prediction.config.APP_URL = 'http://localhost:8000' // default

fs.readFile(__dirname+'/fixtures.json', function (err, data) {
    if (err) {
        console.error("Can't load fixtures: ", e);
        return;
    }
    try {
        var json = JSON.parse(data);
        for (var user in json) {
            console.log('Create user: "'+user+"'");
            prediction.user.createUser(user, function (x, data) {});
            for (var i in json[user]) {
                var show = json[user][i];
                console.log('Add TV show: "'+show+'"');
                (function (user, show) {
                    prediction.item.createItem(show, 'show', function (x, data) {
                        prediction.action.like(user, show, function(x, data) {
                        });
                    });
                })(user, show);
            }
        }
    } catch (e) {
        console.error("Parsing error:", e);
    }
});
