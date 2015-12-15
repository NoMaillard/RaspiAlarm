
var app = angular.module('alarmClock', ['ngMaterial']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
    var socket = io();
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.stopAlarm = function () {
        socket.emit('stop');
    }

    $scope.startAlarm = function () {
        socket.emit('start');
    }

}]);
