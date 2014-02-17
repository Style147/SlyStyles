var altItemWrapper = require('../alt-items.json');
//var designerItemWrapper = require('../designer-items.json');

exports.view = function(req, res) {
	var itemID = req.params.altID;
	itemID = parseInt(itemID);

	//get the alt item to render
	var altItemToShow = altItemWrapper.altItems[itemID];
	altItemToShow.designerItemID = req.params.designerID;
	console.log(altItemToShow);
	
	//pass through
	res.render('altItem', altItemToShow);
}