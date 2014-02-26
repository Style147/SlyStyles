var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');

exports.view = function(req, res){
	designerItemModel.DesignerItem.find().exec(callback);

	function callback(err, designerItems) {
		if(err) {
			console.log(err);
			res.send(500);
		}

		userModel.User.find({'_id':req.session.userid}).exec(foundUser);


		function foundUser(err, foundData){
			var mydlikes = foundData[0].mydlikes;
			console.log(mydlikes);
			for(var i = 0; i<designerItems.length; i++){
				if(mydlikes.indexOf(designerItems[i]._id) != -1){
					designerItems[i] = designerItems[i].toObject();
					designerItems[i].liked = '1';
					console.log(designerItems[i]);
				}
			}

			var toPass = { "user":{ 
			"name":req.session.user,
		 	"imageURL":req.session.imageURL},
		 	"designerItems":designerItems };
			//index.handlebars expects to see a json object with the designerItems attribute
			res.render('frontPage', toPass);

		}

		
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
