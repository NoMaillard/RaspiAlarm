
module.exports = function (app) {

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.post('/start', function (req, res) {
        app.alarm.ring();
        console.log('Wake Up!');
        res.end();
    });

    app.post('/stop', function (req, res) {
        app.alarm.stop();
        console.log('Good !, now go out !');
        res.end();
    });
};
