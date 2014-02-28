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
		var mydlikes = user.mydlikes;
		var myalikes = user.myalikes;
		

		
		designerItemModel.DesignerItem.find({
			'_id': { $in: user.mydContributions}
		}).exec(afterGettingDes);

		function afterGettingDes(err, desigItems) {
			for(var i = 0; i<desigItems.length; i++){
				if(mydlikes.indexOf(desigItems[i]._id) != -1){
					desigItems[i] = desigItems[i].toObject();
					desigItems[i].liked = '1';
				}
			}

			altItemModel.AltItem.find({
				'_id':{$in:user.myaContributions}
			}).exec(afterGettingAlts);
			function afterGettingAlts(err, altItems) {
				for(var i = 0; i<altItems.length; i++){
					if(myalikes.indexOf(altItems[i]._id) != -1){
						altItems[i] = altItems[i].toObject();
						altItems[i].liked = '1';
					}
				}
				if(err) console.log(err);

				var toPass = { "user":{ 
					"name":req.session.user,
					"imageURL":req.session.imageURL},
					"mydContributions":desigItems,
					"myaContributions":altItems};
					console.log(toPass);
					res.render('profilecon', toPass);

				}




			}
		}
	}