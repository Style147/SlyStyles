var mongoose = require('mongoose');

UserSchema = mongoose.Schema({
	"login": String,
	"password": String,
	"myContributions": [mongoose.Schema.Types.ObjectID],
	"name": String,
	"description": String,
	"imageURL": String
});

exports.User = mongoose.model('User', UserSchema);