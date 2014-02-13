var designerItems = require('../designer-items.json');

exports.view = function(req, res){
	console.log('test');
	res.render('index', designerItems);
};