var mongoose = require('mongoose');
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');

UserSchema = mongoose.Schema({
	"login": String,
	"password": String,
	"myContributions": [designerItemModel.DesignerItem],
	"mydlikes": [designerItemModel.DesignerItem],
	"myalikes": [designerItemModel.AltItem],
	"name": String,
	"description": String,
	"imageURL": String
});

exports.User = mongoose.model('User', UserSchema);