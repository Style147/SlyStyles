
var designerItemModel = require('../models/designerItemModel');
var userModel = require('../models/userModel');


exports.login = function(req, res) {
	var user = req.query.user;
	var password = req.query.password;

	userModel.User.find({"login": req.query.user, "password": req.query.password}).exec(checkPosts);

	function checkPosts(err, users){
		if(err) {
			console.log(err);
			res.send(500);
		}
		var selectedUser = users[0];
		if(selectedUser == null){
			res.redirect('/');
		}
		else{
			req.session.user = selectedUser.name;
			req.session.imageURL = selectedUser.imageURL;
			console.log(selectedUser);
			res.redirect('/frontPage');
		}
	}
}	

exports.logout = function(req, res) {
	delete req.session.name;
	delete req.session.imageURL;
	res.redirect('/');
		
}	


	






