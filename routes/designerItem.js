var altItems = require('../alt-items.json');
var designerItems = require('../designer-items.json');

exports.view = function(req, res) {
	var itemID = req.params.id;
	itemID = parseInt(itemID);

	//get the designer item to render
	var designerItemToShow = designerItems[itemID];
	//get the alt items to render
	//   --TODO pick which ones to get
	var altList = altItems.altItems;

	//glom together
	var itemAndAlts = {
		"designerItem": designerItemToShow,
		"altList": altList
	}
	//pass through
	res.render('designerItem', itemAndAlts);
}