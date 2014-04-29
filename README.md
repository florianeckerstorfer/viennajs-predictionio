Machine Learning with Node.js and Prediction.io
===============================================

> TV show recommendation engine built in Node.js using [Prediction.io](http://prediction.io).

Talk at Vienna.js on 29 April 2014 by [Florian Eckerstorfer](http://florian.ec)


Installation
------------

**Requirements**

- [Vagrant](http://www.vagrantup.com) (If you're not familiar with Vagrant, consult the [Getting Started](http://docs.vagrantup.com/v2/getting-started/index.html) guide)
- [VirtualBox](https://www.virtualbox.org)

First you need to checkout this repository:

```shell
$ git clone https://github.com/florianeckerstorfer/viennajs-predictionio
```

Start the virtual machine:

```shell
$ vagrant up
```

SSH into the virtual machine and create an admin user (follow the instructions):

```shell
$ vagrant ssh
$ /opt/PredictionIO/bin/users
```

You can now access the Prediction.io admin GUI at [http://192.168.33.20:9000](http://192.168.33.20:9000) and login using the credentials you defined earlier.

Next you should create an application named `viennajs-tvshow` and add an *Item Recommendation Engine* named `itemrec`.

You can stop the virtual machine by typing `vagrant halt` and no data will be lost. If you want to restart the virtual machine you need to use `vagrant up --provision`. If you destroy the machine you need to set it up again later (creating the user, application and so on) and all data is lost.

Further information about running Prediction.io using Vagrant exists in the [Installing Prediction.io with Vagrant (VirtualBox)](http://docs.prediction.io/current/installation/install-predictionio-with-virtualbox-vagrant.html) guide.

If Prediction.io works you can start the application.

```shell
$ vagrant ssh
$ cd /vagrant
$ node app.js
```

You should no be able to access the web application using [http://192.168.33.20:3000](http://192.168.33.20:3000).


Dependencies
------------

- Express
- [PredictionIO Client](https://github.com/kostyantyn/PredictionIO-NodeJS-Client) ([NPM](https://www.npmjs.org/package/predictionio-client))
