console.log('Init App!');

var app = angular.module('RoomMade', []);

app.service('myService', function ($http) {

  this.getGreeting = function($scope) {
    var greeting;

    $http.get('/server/greeting.json')
      .success(function (data) {
          $scope.greeting = data.greeting;
      });

    return greeting;
  };

});

app.controller('mainCtrl', function ($scope, myService) {
    myService.getGreeting($scope);
})