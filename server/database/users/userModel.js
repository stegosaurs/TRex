var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	username: {
	type: String,
	required: true,
	unique: true
	},
	wins: {
	type: Number,
	default: 0
	},
	losses: {
	type: Number,
	default: 0
	},
	coins: {
	type: Number,
	default: 3
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;