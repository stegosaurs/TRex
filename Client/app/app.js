angular.module("app", [
  "timer",
  "app.auth",
  "app.race",
  "app.leaderboard",
  "ngRoute",
  "ngMaterial",
  "ngMessages"
  ])

.config(function($routeProvider){
  $routeProvider
      .when('/signin', {
        templateUrl: '../auth/signin.html',
        controller: 'AuthController'
      })
      // The raceView address will have the user and room id
      // These ids are used for the socket instantiateUser event
      .when('/raceView/:roomId/:userId', {
        templateUrl: '../race/race.html',
        controller: 'raceController'
      })
      .when('/leaderboard', {
        templateUrl: '../leaderboard/leaderboard.html',
        controller: 'leaderboardController'
      })
      // Default back to /signin page
      .otherwise({
        redirectTo: '/signin'
      }); 
});

