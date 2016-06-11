angular.module('app.leaderboard', ['ngRoute'])

.controller('leaderboardController', function ($scope, $location, socket, $http) {
  $scope.connectedUsers= [];
  $scope.connectedUsers = [];
  $scope.users = {};
  $scope.images = ["../assets/trex-winning-b.gif", "../assets/trex-winning-g.gif", "../assets/trex-winning-r.gif"];
  
  // designates random dino image to place next to user in leaderboard
  $scope.randomImg = function(){
    var num = Math.floor(Math.random() * 3);
    return $scope.images[num];
  };
  
  // calculates win percentage for each user
  // $scope.winPercentage = function(){
  //   console.log("scope: w, l, users: ", $scope.users.wins, $scope.users.losses)
  //   return ($scope.users.wins/$scope.users.losses * 100);
  // };
  
  // click to redirect to leaderboard view
  $scope.viewSignin = function () {
    $location.path('/signin');
  };
  
  // gets all users from db and populates leaderboard using scope.users
  function getAll() {
    $http.get('/leaderboard').then(function(res) {
      $scope.users = res.data; 
      console.log(res.data, "<---- users");
    });
  }
  
  getAll();
  
});
