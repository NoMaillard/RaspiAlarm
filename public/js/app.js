
var app = angular.module('alarmClock', ['ngMaterial']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.stopAlarm = function () {
        $http.post('/stop');
    }

    $scope.startAlarm = function () {
        $http.post('/start');
    }

}]);
