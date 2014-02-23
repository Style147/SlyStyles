
var userModel = require('../models/userModel');


exports.login = function(req, res) {
	var user = req.query.user;
	var password = req.query.password;

	userModel.User.find({"login": user, "password": password}).exec(checkPosts);

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

exports.getLikes = function(req, res) {
	res.redirect('/');
		
}	


exports.create = function(req, res) {
	if(req.method === 'POST') {
		console.log('creating new account');
		var newUser = new userModel.User({
			"login": req.body.username,
			"password": req.body.password,
			"myContributions": [],
			"name": req.body.name,
			"imageURL": req.body.imageURL
		});
		console.log('newUser: '+newUser);
		newUser.save(function(err, savedThing) {
			if(err) {console.log(err); res.send(500);}
			console.log('new account saved, logging in');
			var loginURL = '/login?user='+req.body.username+'&password='+req.body.password;
			console.log(loginURL);
			res.redirect(loginURL);
		});
	}
	else if(req.method === 'GET') {
		console.log('going to create page');
		res.render('createAccount');
	}
}






