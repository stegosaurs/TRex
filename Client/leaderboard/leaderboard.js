angular.module('app.leaderboard', ['ngRoute'])

.controller('leaderboardController', function ($scope, $location, socket, $http) {
  $scope.connectedUsers= [];
  $scope.connectedUsers = [];
  $scope.users = {};
  // need to figure out how to get users and populate leaderboard table
  function getAll() {
    $http.get('/leaderboard').then(function(res) {
      $scope.users = res.data; 
      console.log(res.data, "<---- users");
    });
  }
  
  getAll();
  
  
  // ********** Server/Socket Interactions **********
      // Test server connection
      socket.on('test', function(msg) {
        console.log(msg);
      });

      // Instantiate user on the server when connected to a room
      socket.emit('instantiateUser', {username: $scope.username, room: $scope.room }, function(result, msg, isAdmin) {
        $scope.isUserAdmin = isAdmin;
        console.log(logMsg(result, msg));
      });

      // // To get room data generated on the server for this room
      // socket.on('retrieveRoomData', function(data, msg) {
      //   // Update current user's controller scope data
      //   $scope.countdownTime = data.time;
      //   $scope.racerMoves = data.racerMoves;
      //   addOrUpdateUsers(data.users);

      //   // Update timer directive with the time set by the admin
      //   $scope.$broadcast('timer-set-countdown-seconds', $scope.countdownTime);
      //   console.log('SUCCESS: ' + msg);
      // });

      // Whenever a user is instantiated on the server, add the updated user to $scope.connectedUsers
      socket.on('retrieveUserData', function(data, msg) {
        addOrUpdateUsers(data.users);
        console.log('User data loaded: ' + msg);
      });
      
      // Server user object is not the same as connectedUsers, so this gets updated slightly differently
      var addOrUpdateUsers = function(users) {
        var connectedUsers = {};

        // Make connectedUsers an object with users and indexes
        for (var i = 0; i < $scope.connectedUsers.length; i++) {
          connectedUsers[$scope.connectedUsers[i].username] = $scope.connectedUsers[i];
          connectedUsers[$scope.connectedUsers[i].username].index = i;
        }

        // Iterate over each updated user from the server
        for (var user in users) {
          // check if user is a part of connectedUsers already
          if (!connectedUsers[user]) {
            $scope.connectedUsers.push(users[user]);
          } else { // else the user exists so update its record
            $scope.connectedUsers[connectedUsers[user].index].racerChoice = users[user].racerChoice;
            // .. other properties you may want to update
          }
        }
      };

      // utility function for logging messages from the server
      var logMsg = function(result, msg) {
        if (!result) { return 'ERROR: ' + msg; }
        return 'SUCCESS: ' + msg;
      };


  // can use below to redirect to landing page

  // $scope.ctrlSignIn = function () {
  //   // Upon submit of the signin form redirect to raceView using the racename and username
  //   $location.path('/raceView/' + $scope.racename + '/' + $scope.username);
  // };


})


  // Factory for using socket.io in racer controller.
  .factory('socket', function ($rootScope) {
    // For development testing need to set it to use 'http://' since localhost uses http
    // For production, can use either http or https but the web address will have to match it
    var socket = io.connect('http://' + window.location.hostname + ":" + location.port);

    // Error handling can be applied passing in a callback when executing socket methods on or emit
    var on = function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    };

    var emit = function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    };

    return {
      on: on,
      emit: emit
    };
  });
