var altItems = require('../alt-items.json');
var designerItemWrapper = require('../designer-items.json');

exports.view = function(req, res) {
	var itemID = req.params.id;
	itemID = parseInt(itemID);

	//get the designer item to render
	var designerItemToShow = designerItemWrapper.designerItems[itemID];
	console.log(designerItemToShow);
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