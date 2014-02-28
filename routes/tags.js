
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');


exports.search = function(req, res){
	var tag = req.params.tag;
	designerItemModel.DesignerItem.find({"tags": tag}).exec(callback);
	function callback(err, data){
		altItemModel.AltItem.find({"tags": tag}).exec(callbackalt);
		function callbackalt(err, dataAlt){
			var toPass = { 
			"user": { 
				"name": req.session.user,
				"imageURL": req.session.imageURL
			},
			"tag": tag,
			"designerItems": data,
			"altItems": dataAlt
		};
		res.render('tags', toPass)
		}
		
	}
}
