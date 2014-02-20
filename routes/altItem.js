var altItemWrapper = require('../alt-items.json');
//var designerItemWrapper = require('../designer-items.json');

var altItemModel = require('../models/altItemModel');

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
		var altItem = altItems[0];
		altItem.prevDesignerItemID = req.params.designerID;
		res.render('altItem', altItem)
	}
	
	/*
	var altItemToShow = altItemWrapper.altItems[itemID];
	altItemToShow.designerItemID = req.params.designerID;
	console.log(altItemToShow);
	
	//pass through
	res.render('altItem', altItemToShow);
	*/
}