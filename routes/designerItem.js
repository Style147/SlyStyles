
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
			designerItem.altItems = altItems;
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
		"alts": null,
	});
	console.log(req.body);
	newPost.save(afterSaving);

	function afterSaving(err) { // this is a callback
  		if(err) {console.log(err); res.send(500); }
  		res.redirect('/');
	}
}

