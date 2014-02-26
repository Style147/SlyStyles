var mongoose = require('mongoose');
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');

UserSchema = mongoose.Schema({
	"login": String,
	"password": String,
	"myContributions": [mongoose.Schema.Types.ObjectId],
	"mydlikes": [mongoose.Schema.Types.ObjectId],
	"myalikes": [mongoose.Schema.Types.ObjectId],
	"name": String,
	"description": String,
	"imageURL": String
});

exports.User = mongoose.model('User', UserSchema);