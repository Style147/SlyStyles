
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');


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

		

		/**
		 * The below code just adds all of the alt items we have as alts
		 * for this designerItem.
		 * TODO: it should be iterating over the alts array of ObjectId in
		 * designerItem and just getting those
		 */
		 altItemModel.AltItem.find().exec(temp);
		function temp(err, altItems) {
			if(err) console.log(err);
			designerItem.alts.concat(altItems);
			console.log('GETTING');
			console.log(designerItem);
			res.render('designerItem', designerItem);
		}
		//res.render('designerItem', designerItems[0]);
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

	function afterSaving(err) { // this is a callback
  		if(err) {console.log(err); res.send(500); }
  		res.redirect('/frontPage');
	}
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
	})

	newAlt.save(afterSaving);

	function afterSaving(err) {
		if(err) { console.log(err); res.send(500); }

		designerItemModel.DesignerItem.update({_id: designerItemID},
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

