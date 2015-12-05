var alarm = require('./alarm');
var EventEmitter = require('events').EventEmitter;

alarm.addAlarm("Wake1", 10, 34, "weekdays");
alarm.addAlarm("Wake1", 10, 34, "weekdays");

console.log(alarm);
