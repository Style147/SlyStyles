
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

		userModel.User.find({'_id':req.session.userid}).exec(foundUser);


		function foundUser(err, foundData){

			var designerItem = designerItems[0];
			var mydlikes = foundData[0].mydlikes;
			altItemModel.AltItem.find({
				'_id': { $in: designerItem.alts }
			}).exec(afterGettingAlts);


			function afterGettingAlts(err, altItems) {
				if(mydlikes.indexOf(designerItem._id) != -1){
					designerItem = designerItem.toObject();
					designerItem.liked = '1';
				}
				if(err) console.log(err);
				var toPass = { 
					"user": { 
						"name": req.session.user,
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
	var newPost = new designerItemModel.DesignerItem({
		"brand": req.body.brand,
		"name": req.body.name,
		"price": parseFloat(req.body.price),
		"description": req.body.description,
		"image": req.body.imageURL,
		"type": req.body.type,
		"likes": 0,
		"alts": [],
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
	res.redirect('/frontpage');
}

exports.addAltItem = function(req, res) {
	var designerItemID = req.params.designerID;
	var newAlt = new altItemModel.AltItem({
		"brand": req.body.brand,
		"name": req.body.name,
		"price": parseFloat(req.body.price),
		"description": req.body.description,
		"image": req.body.imageURL,
		"type": req.body.type,
		"likes": 0,
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
			if(err) {console.log(err); res.send(500);}
			console.log('AFTER UPDATE');
			console.log(data);
			res.redirect('/designerItem/' + designerItemID);
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
	res.redirect('/frontpage');
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
	res.redirect('/frontpage');
}

