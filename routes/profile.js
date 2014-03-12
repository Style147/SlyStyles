var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');

exports.view = function(req, res) {
	if(typeof req.session.user != 'undefined'){

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
			for(var i = 0; i<desigItems.length; i++){
				desigItems[i] = desigItems[i].toObject();
				desigItems[i].brand = desigItems[i].brand.toUpperCase();
				desigItems[i].name = desigItems[i].name.toUpperCase();
			}
			altItemModel.AltItem.find({
				'_id': { $in: user.myalikes}
			}).exec(afterGettingAlts);
			if(err) console.log(err);
			function afterGettingAlts(err, altItems) {
				for(var i = 0; i<altItems.length; i++){
					altItems[i] = altItems[i].toObject();
					altItems[i].brand = altItems[i].brand.toUpperCase();
					altItems[i].name = altItems[i].name.toUpperCase();
				}
				designerItemModel.DesignerItem.find({
					'_id': { $in: user.mydContributions}
				}).exec(afterGettingDCont);
				function afterGettingDCont(err, mydconts){
					for(var i = 0; i<mydconts.length; i++){
						mydconts[i] = mydconts[i].toObject();
						mydconts[i].brand = mydconts[i].brand.toUpperCase();
						mydconts[i].name = mydconts[i].name.toUpperCase();
						if(user.mydlikes.indexOf(mydconts[i]._id) != -1){
							mydconts[i].liked = '1';
						}
					}
					altItemModel.AltItem.find({
						'_id': { $in: user.myaContributions}
					}).exec(afterGettingACont);
					function afterGettingACont(err, myaconts){
						for(var i = 0; i<myaconts.length; i++){
							myaconts[i] = myaconts[i].toObject();
							myaconts[i].brand = myaconts[i].brand.toUpperCase();
							myaconts[i].name = myaconts[i].name.toUpperCase();
							if(user.myalikes.indexOf(myaconts[i]._id) != -1){
								myaconts[i].liked = '1';
							}
						}
						var toPass = { 
							"user":{ 
								"name":req.session.user.toUpperCase(),
								"imageURL":req.session.imageURL},
								"mydlikes":desigItems,
								"myalikes":altItems,
								"mydContributions": mydconts,
								"myaContributions": myaconts,
								"description":user.description
							};
							console.log(toPass);
							res.render('profile', toPass);
						}
						
					}
					
				}
			}
		}
	}
	else{
		res.render('index');
	}
	}

//this is exactly the same as view except it renders profile_expmt
//this allows tracking of pageviews for the experiment so pageviews 
//the of profile_expmt will show ppl who clicked the hear
exports.viewExpmt = function(req, res) {
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
				var toPass = { 
					"user":{ 
						"name":req.session.user,
						"imageURL":req.session.imageURL},
						"mydlikes":desigItems,
						"myalikes":altItems
					};
					console.log(toPass);
					res.render('profile_expmt', toPass);
				}
			}
		}
	}

	exports.viewBase = function(req, res) {
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
				var toPass = { 
					"user":{ 
						"name":req.session.user,
						"imageURL":req.session.imageURL},
						"mydlikes":desigItems,
						"myalikes":altItems
					};
					console.log(toPass);
					res.render('profile_base', toPass);
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