var User = require('./userModel.js');

module.exports = {
  fetchAll: function(callback) {
    User.find(function(err,users) {
      if(err) {
        console.error(err);
      } else {
        callback(users);
      }
    });
  },
  
  getUserStats: function(username, callback) {	
  	User.findOne({username: username}).exec(function(err, foundUser) {
  		if (foundUser) {
        console.log('found the user');
  			callback(foundUser);
  		} else {
        console.log('did not find the user');
  			var user = {username: username, wins: 0, losses: 0};
        User.create(user);
        callback(user);
  		}
  	});
  },
  
  updateUserStats: function(username, didUserWin, callback) {
    if (didUserWin) {
      User.update({username: username}, {$inc: {wins: 1}}, function (err, data) {
        if (err) {
          console.log('Error ', err);
        } else {
          console.log('The response was ', data);
        }
      });
    } else {
      User.update({username: username}, {$inc: {losses: 1}}, function (err, data) {
        if (err) {
          console.log('Error ', err);
        } else {
          console.log('The response was ', data);
        }
      });
    }
  },
  
  updateUser: function(username, user, options, callback){
    var query = {username: username};
    var update = {
      coins: user.coins
    };
    User.findOneAndUpdate(query, update, options, callback);
  }
};
