var designerItems = require('../designer-items.json');

exports.view = function(req, res){
	res.render('index', designerItems);
};