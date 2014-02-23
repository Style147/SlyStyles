var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');

exports.view = function(req, res) {


	//get the designer item to render
	userModel.User.find({"login": req.session.username}).exec(callback);

	function callback(err, users) {
		console.log(users[0]);
		if(err) {
			console.log(err);
			res.send(500);
		}
		var user = users[0];
		var toPass = { "user":{ 
			"name":req.session.user,
			"imageURL":req.session.imageURL},
			"dlikes": user.mydlikes};
			
		res.render('profile', toPass);



	}
}