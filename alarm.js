var util = require('util');
var EventEmitter = require('events').EventEmitter;


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
}

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
        hr : 10,
        min : 26,
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

// util funtion to check integrity of the daysOfTheWeek array (dow)
function validate_dow(dow) {

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

    if (dow === "weekdays") {
        dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    } else if (dwo === "weekends") {
        dow = ["Saturday", "Sunday"];
    } else {
        for (var day in dow) {
            if (!isIn(day, dow)) {
                throw "The daysOfTheWeek array is Wrong !"
            }
        }
    }
    return dow;
}


// expose the module
module.exports = new Alarm();
