var util = require('util');
var EventEmitter = require('events').EventEmitter;
var exec = require('child_process').exec;


function Alarm () {

    var self = this;
    // An alarm is just an EventEmitter
    EventEmitter.call(this);

    /**
    * this is the alarm array
    * it contains every alarm
    * here's a example of an alarm :
    * {
    * 		hr : 10,
    * 		min : 26,
    * 		dow : []               // the array can be filled with any of the days
    * 		enabled : True/False
    * }
    */
    self.alarms = [];
    self.canPlay = true;

};

var daysOfTheWeek = {
    "Sunday" : 0,
    "Monday" : 1,
    "Tuesday" : 2,
    "Wednesday" : 3,
    "Thursday" : 4,
    "Friday" : 5,
    "Saturday" : 6
};

util.inherits(Alarm, EventEmitter);

/**
* adds an alarm to the array
* @param  {String}  name       name of the alarm only 1 allowed
* @param  {Integer} hr         hour
* @param  {Integer} min        minutes
* @param  {String array} dow   days to trigger the alarm can also be "weekdays" or "weekends"
* @return {void}
*/
Alarm.prototype.addAlarm = function(name, hr, min, dow) {
    dow = validate_dow(dow);

    this.alarms[this.alarms.length] = {
        name : name,
        hr : hr,
        min : min,
        dow : dow
    }
}


/**
* removes the first occurence of the passed alarm name (since it should be the only one)
* @param  {String} name    name of the alarm
* @return {void}
*/
Alarm.prototype.deleteAlarm = function (name) {
    for (var i = 0; i < self.alarms.length; i++) {
        if (this.alarms[i].name === name) {
            this.alarms.splice(i, 1);
            break;
        }
    }
}

Alarm.prototype.check = function () {
    var self = this;
    console.log(this);
    setInterval(function () {
        now = new Date();
        for (alarm of self.alarms) {
            if (alarm.hr === now.getHours() &&
            alarm.min === now.getMinutes() &&
            isIn(now.getDay(), alarm.dow)) {
                self.emit('ring');
            }
        }
    }, 10000)
};

Alarm.prototype.stop = function () {
    this.emit('stop');
};

Alarm.prototype.ring = function () {
    this.emit('ring');
};

/**
* finds an element in an array copied from jQuery
* @param  {object}  needle   thing to find
* @param  {array}  haystack array to find the object in
* @return {Boolean}          returns true is hte object is in the array
*/
var isIn = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

// util funtion to check integrity of the daysOfTheWeek array (dow)
function validate_dow(dow) {

    if (dow === "weekdays") {
        dow = [
            daysOfTheWeek["Monday"],
            daysOfTheWeek["Tuesday"],
            daysOfTheWeek["Wednesday"],
            daysOfTheWeek["Thursday"],
            daysOfTheWeek["Friday"]
        ];
    } else if (dow === "weekends") {
        dow = [
            daysOfTheWeek["Saturday"],
            daysOfTheWeek["Sunday"]
        ];
    } else {
        var i = 0;
        for (var day of dow) {
            dow[i++] = daysOfTheWeek[day];
        }
    }
    return dow;
}

var alarm = new Alarm();
// this is the alarm checker, runs indefinately
alarm.on('ring', function () {
    if (alarm.canPlay) {
        alarm.player = exec('mplayer song.mp3');
        alarm.canPlay = false;
    }
}).on('stop', function () {
    if (alarm.player) {
        alarm.player.kill();
        alarm.canPlay = true;
    }

}).check();

alarm.addAlarm("wake", 7, 00, ['weekdays']);
alarm.addAlarm("wake", 7, 05, ['weekdays']);
alarm.addAlarm("wake", 7, 10, ['weekdays']);
// expose the module
module.exports = alarm
