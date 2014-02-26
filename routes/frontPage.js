//var designerItems = require('../designer-items.json');
var designerItemModel = require('../models/designerItemModel');


exports.view = function(req, res){
	console.log(req.session.user);
	designerItemModel.DesignerItem.find().exec(callback);

	function callback(err, designerItems) {
		if(err) {
			console.log(err);
			res.send(500);
		}
		var toPass = { "user":{ 
			"name":req.session.user,
		 	"imageURL":req.session.imageURL},
		 "designerItems":designerItems };
		 console.log(toPass);
		//index.handlebars expects to see a json object with the designerItems attribute
		res.render('frontPage', toPass);
	}
	
};

exports.searchDesignerItems = function(req, res) {
	var searchText = req.query.searchText;
	var regex = new RegExp(searchText, 'i');
	console.log(regex);
	designerItemModel.DesignerItem.find({name: regex}, afterFinding);

	var afterFinding = function(err, designerItems) {
		if(err) {
			console.log(err);
			res.send(500);
		}
		console.log('afterFinding');
		var toPass = { 
			"user": { 
				"name": req.session.user,
		 		"imageURL": req.session.imageURL
		 	},
		 	"designerItems": designerItems
		 };
		 console.log(toPass);
		//index.handlebars expects to see a json object with the designerItems attribute
		res.render('frontPage', toPass);
	}
}