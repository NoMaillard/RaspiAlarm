#!/usr/local/bin/node

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var alarm          = require('./alarm');
var server         = require('http').createServer(app);
var io             = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('stop', function ()
        alarm.stop();
        console.log('stop');
    });

    socket.on('start', function () {
        alarm.ring();
        console.log('start');
    })
});

console.log(app.alarm);


var port = process.env.PORT || 8088;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

server.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app;
