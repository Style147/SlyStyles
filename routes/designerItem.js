
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');


exports.view = function(req, res) {
	var itemID = req.params.id;

	//get the designer item to render
	designerItemModel.DesignerItem.find({"_id": itemID}).exec(callback);

	function callback(err, designerItems) {

		if(err) {
			console.log(err);
			res.send(500);
		}

		var designerItem = designerItems[0];

		userModel.User.find({'_id':req.session.userid}).exec(foundUser);

		function foundUser(err, foundData){
			var mydlikes = foundData[0].mydlikes;
			var myalikes = foundData[0].myalikes;
			altItemModel.AltItem.find({
				'_id': { $in: designerItem.alts }
			}).exec(afterGettingAlts);

			function afterGettingAlts(err, altItems) {
				designerItem = designerItem.toObject();
				designerItem.brand = designerItem.brand.toUpperCase();
				designerItem.name = designerItem.name.toUpperCase();
				if(mydlikes.indexOf(designerItem._id) != -1){
					designerItem.liked = '1';
				}
				for(var i = 0; i<altItems.length; i++){
					altItems[i] = altItems[i].toObject();
					altItems[i].brand = altItems[i].brand.toUpperCase();
					altItems[i].name = altItems[i].name.toUpperCase();
					if(myalikes.indexOf(altItems[i]._id) != -1){
						
						altItems[i].liked = '1';
						console.log(designerItems[i]);
					}
				}
				if(err) console.log(err);
				var toPass = { 
					"user": { 
						"name": req.session.user.toUpperCase(),
						"imageURL": req.session.imageURL
					},
					"designerItem": designerItem,
					"alts": altItems
				};
				
				console.log('array of alt items:' + altItems);

				console.log(toPass);
				res.render('designerItem', toPass);
			}
		}

	}

}

exports.addDesignerItem = function(req, res) {
	var splittags = req.body.tags.split(" ");
	var newPost = new designerItemModel.DesignerItem({
		"brand": req.body.brand,
		"name": req.body.name,
		"price": parseFloat(req.body.price),
		"image": req.body.imageURL,
		"likes": 0,
		"alts": [],
		"tags": splittags
	});
	console.log(req.body);
	newPost.save(afterSaving);
	console.log(newPost);

	function afterSaving(err) { // this is a callback
		userModel.User.update({'_id': req.session.userid},
			{$push: {'mydContributions': newPost}},
			{upsert: true},
			afterUpdate);
		function afterUpdate(err){
			if(err) {console.log(err); res.send(500);}
		}
	}
	res.redirect('back');
}

exports.addAltItem = function(req, res) {
	var splittags = req.body.tags.split(" ");
	var designerItemID = req.params.designerID;
	var newAlt = new altItemModel.AltItem({
		"brand": req.body.brand,
		"name": req.body.name,
		"price": parseFloat(req.body.price),
		"image": req.body.imageURL,
		"type": req.body.type,
		"likes": 0,
		"tags": splittags,
		"designerMatch": designerItemID
	});
	console.log(newAlt);

	newAlt.save(afterSaving);


	function afterSaving(err) {
		if(err) { console.log(err); res.send(500); }

		designerItemModel.DesignerItem.update({'_id': designerItemID},
			{$push: {'alts': newAlt._id}},
			{upsert: true},
			afterUpdating);


		function afterUpdating(err, data) {
			userModel.User.update({'_id': req.session.userid},
			{$push: {'myaContributions': newAlt}},
			{upsert: true},
			afterUpdate);
			function afterUpdate(err){
				if(err) {console.log(err); res.send(500);}
			}
			if(err) {console.log(err); res.send(500);}
			console.log('AFTER UPDATE');
			console.log(data);
			res.redirect('back');
		}
	}

}

exports.like = function(req, res) {
	var itemID = req.params.itemID;
	console.log(req.params.itemID);
	

	//add to users dlikes
	console.log(req.session);

	designerItemModel.DesignerItem.find({"_id": itemID}).exec(foundDesigner);

	function foundDesigner(err, data){

		var newCount = data[0].likes + 1;
		console.log(newCount);
		var conditions = {"_id":itemID};
		var update = {$inc:{"likes":1}};
		var options = {multi: false};
		designerItemModel.DesignerItem.update(conditions, update, options, goodDesigner);
		function goodDesigner(err){
			if(err) { console.log(err); res.send(500); }
		}
		console.log('userid' + req.session.userid);
		userModel.User.update({'_id': req.session.userid},
			{$push: {'mydlikes': data[0]}},
			{upsert: true},
			afterUpdate);
		function afterUpdate(err){
			if(err) {console.log(err); res.send(500);}
		}
	}
	res.redirect('back');
}

exports.unlike = function(req, res) {
	var itemID = req.params.itemID;
	console.log(req.params.itemID);
	

	//add to users dlikes
	console.log(req.session);

	designerItemModel.DesignerItem.find({"_id": itemID}).exec(foundDesigner);

	function foundDesigner(err, data){

		var conditions = {"_id":itemID};
		var update = {$inc:{"likes":-1}};
		var options = {multi: false};
		designerItemModel.DesignerItem.update(conditions, update, options, goodDesigner);
		function goodDesigner(err){
			if(err) { console.log(err); res.send(500); }
		}
		console.log('userid' + req.session.userid);
		userModel.User.update({'_id': req.session.userid},
			{$pull: {'mydlikes': data[0]}},
			{upsert: true},
			afterUpdate);
		function afterUpdate(err){
			if(err) {console.log(err); res.send(500);}
		}
	}
	res.redirect('back');
}

exports.filter = function(req, res) {
	var designerItemID = req.params.designerID;
	var filterType = req.params.filterType;

	//get the designer item
	designerItemModel.DesignerItem.find({"_id": designerItemID}).exec(callback);

	function callback(err, designerItems) {

		if(err) {
			console.log(err);
			res.send(500);
		}

		var designerItem = designerItems[0];

		userModel.User.find({'_id':req.session.userid}).exec(foundUser);

		function foundUser(err, foundData){

			if(foundData[0]) {
				var mydlikes = foundData[0].mydlikes;
				var myalikes = foundData[0].myalikes;
			}

			//filter/sort action
			if(filterType === 'likes') {
				altItemModel.AltItem.find({
					'_id': { $in: designerItem.alts }
				}).sort({likes: -1}).exec(afterGettingAlts);
			}
			else if(filterType === 'priceLoHi') {
				altItemModel.AltItem.find({
					'_id': { $in: designerItem.alts }
				}).sort({price: 1}).exec(afterGettingAlts);
			}
			else if(filterType === 'priceHiLo') {
				altItemModel.AltItem.find({
					'_id': { $in: designerItem.alts }
				}).sort({price: -1}).exec(afterGettingAlts);
			}

			function afterGettingAlts(err, altItems) {
				if(err) console.log(err);

				if(foundData[0]) {
					if(mydlikes.indexOf(designerItem._id) != -1){
						designerItem = designerItem.toObject();
						designerItem.liked = '1';
					}
					for(var i = 0; i<altItems.length; i++){
						if(myalikes.indexOf(altItems[i]._id) != -1){
							altItems[i] = altItems[i].toObject();
							altItems[i].liked = '1';
							console.log(designerItems[i]);
						}
					}
				}

				var toPass = {
					"designerItem": designerItem,
					"alts": altItems
				};
				
				console.log('array of alt items:' + altItems);

				console.log(toPass);

				//send the json back
				res.json(toPass);
			}
		}

	}
}