angular.module('app.leaderboard', ['ngRoute'])

.controller('leaderboardController', function ($scope, $location) {
  // need to figure out how to get users and populate leaderboard table
  // function getAll() {
  //   $http.get('').then(function(res) {
  //     $scope.users = res.data; 
  //     console.log($scope.users, "<---- users");
  //   });
  // }
  
  // getAll();


  // can use below to redirect to landing page

  // $scope.ctrlSignIn = function () {
  //   // Upon submit of the signin form redirect to raceView using the racename and username
  //   $location.path('/raceView/' + $scope.racename + '/' + $scope.username);
  // };

});
