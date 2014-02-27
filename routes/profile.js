var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');

exports.view = function(req, res) {


	//get the designer item to render
	userModel.User.find({"_id": req.session.userid}).exec(callback);

	function callback(err, users) {
		console.log(users[0]);
		if(err) {
			console.log(err);
			res.send(500);
		}
		var user = users[0];
		

		console.log(user.mydlikes);
		designerItemModel.DesignerItem.find({
			'_id': { $in: user.mydlikes}
		}).exec(afterGettingDesigs);

		function afterGettingDesigs(err, desigItems) {
			altItemModel.AltItem.find({
				'_id': { $in: user.myalikes}
			}).exec(afterGettingAlts);
			if(err) console.log(err);
			function afterGettingAlts(err, altItems) {
				var toPass = { "user":{ 
					"name":req.session.user,
					"imageURL":req.session.imageURL},
					"mydlikes":desigItems,
					"myalikes":altItems};
					console.log(toPass);
					res.render('profile', toPass);

				}
			}

			
		}
	}

	exports.viewcon = function(req, res) {


	//get the designer item to render
	userModel.User.find({"_id": req.session.userid}).exec(callback);

	function callback(err, users) {
		console.log(users[0]);
		if(err) {
			console.log(err);
			res.send(500);
		}
		var user = users[0];
		

		
		designerItemModel.DesignerItem.find({
			'_id': { $in: user.mydContributions}
		}).exec(afterGettingAlts);

		function afterGettingAlts(err, desigItems) {
			if(err) console.log(err);

			console.log(desigItems);
			var toPass = { "user":{ 
				"name":req.session.user,
				"imageURL":req.session.imageURL},
				"mydContributions":desigItems};
				console.log(toPass);
				res.render('profilecon', toPass);

			}
		}
	}