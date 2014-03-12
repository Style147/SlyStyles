
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');


exports.view = function(req, res) {
	if(typeof req.session.user != 'undefined'){
	
	userModel.User.find({'_id':req.session.userid}).exec(callback);
	function callback(err, userInfo){
		
		var userinfo = userInfo[0];
		var toPass = { "user":{ 
		"name":req.session.user,
		 "imageURL":req.session.imageURL},
		 'userinfo':userinfo};

		 console.log(userinfo);

		 res.render('settings', toPass);
	}
	}
	else{
		res.render('index');
	}
	
}