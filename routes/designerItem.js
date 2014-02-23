
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
		console.log(designerItems);
		var designerItem = designerItems[0];
		//console.log(designerItem);
		console.log(designerItem.alts);
		altItemModel.AltItem.find({
			'_id': { $in: designerItem.alts}
		}).exec(afterGettingAlts);

		function afterGettingAlts(err, altItems) {
			if(err) console.log(err);

			console.log('array of alt items:' + altItems);

			altItemModel.AltItem.find().exec(temp);

			var temp = function(err, stuff) {
				if(err) {
					console.log(err);
					res.send(500);
				}

				altItems.concat('concatted ' + stuff);

				console.log(altItems);

				var toPass = { 
					"user": { 
						"name": req.session.user,
			 			"imageURL": req.session.imageURL
			 		},
			 		"designerItem": designerItem,
			 		"alts": altItems
			 	};
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

