var altItemWrapper = require('../alt-items.json');
//var designerItemWrapper = require('../designer-items.json');

var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');

exports.like = function(req, res) {
	var itemID = req.params.itemID;
	console.log(req.params.itemID);
	

	//add to users dlikes
	console.log(req.session);

	altItemModel.AltItem.find({"_id": itemID}).exec(foundDesigner);

	function foundDesigner(err, data){

		var newCount = data[0].likes + 1;
		console.log(newCount);
		var conditions = {"_id":itemID};
		var update = {$inc:{"likes":1}};
		var options = {multi: false};
		altItemModel.AltItem.update(conditions, update, options, goodDesigner);
		function goodDesigner(err){
			if(err) { console.log(err); res.send(500); }
		}
		console.log('userid' + req.session.userid);
		userModel.User.update({'_id': req.session.userid},
			{$push: {'myalikes': data[0]}},
			{upsert: true},
			afterUpdate);
		function afterUpdate(err){
			if(err) {console.log(err); res.send(500);}
		}
	}
	res.redirect('back');
}

exports.view = function(req, res) {
	var itemID = req.params.altID;
	//itemID = parseInt(itemID);

	//get the alt item to render
	altItemModel.AltItem.find({"_id": itemID}).exec(callback);

	function callback(err, altItems) {
		if(err) {
			console.log(err);
			res.send(500);
		}
		userModel.User.find({'_id':req.session.userid}).exec(foundUser);


		function foundUser(err, foundData){

			var altItem = altItems[0];
			var myalikes = foundData[0].myalikes;
			altItem = altItem.toObject();
			altItem.name = altItem.name.toUpperCase();
			altItem.brand = altItem.brand.toUpperCase();
			
			if(myalikes.indexOf(altItem._id) != -1){
				
				altItem.liked = '1';
			}
			if(err) console.log(err);
			altItem.prevDesignerItemID = req.params.designerID;
			designerItemModel.DesignerItem.find({"_id": req.params.designerID}).exec(callbackD);
			function callbackD(err, foundData){
				var designerItem = foundData[0].toObject();
				designerItem.name = designerItem.name.toUpperCase();
				designerItem.brand = designerItem.brand.toUpperCase();
				var toPass = { "user":{ 
				"name":req.session.user.toUpperCase(),
				"imageURL":req.session.imageURL},
				"altItem":altItem,
				"designerItem":designerItem};
				console.log(toPass);
			res.render('altItem', toPass)
			}
			
			
			
		}
		

	}
}

	exports.unlike = function(req, res) {
		var itemID = req.params.itemID;
		console.log(req.params.itemID);


	//add to users dlikes
	console.log(req.session);

	altItemModel.AltItem.find({"_id": itemID}).exec(foundAlt);

	function foundAlt(err, data){

		var conditions = {"_id":itemID};
		var update = {$inc:{"likes":-1}};
		var options = {multi: false};
		altItemModel.AltItem.update(conditions, update, options, goodDesigner);
		function goodDesigner(err){
			if(err) { console.log(err); res.send(500); }
		}
		console.log('userid' + req.session.userid);
		userModel.User.update({'_id': req.session.userid},
			{$pull: {'myalikes': data[0]}},
			{upsert: true},
			afterUpdate);
		function afterUpdate(err){
			if(err) {console.log(err); res.send(500);}
		}
	}
	res.redirect('back');
}