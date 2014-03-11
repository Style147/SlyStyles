
var designerItemModel = require('../models/designerItemModel');
var altItemModel = require('../models/altItemModel');
var userModel = require('../models/userModel');


exports.search = function(req, res){
	if(typeof req.session.user != 'undefined'){
	userModel.User.find({'_id':req.session.userid}).exec(foundUser);
	function foundUser(err, user){
		var mydlikes = user[0].mydlikes;
		var myalikes = user[0].myalikes;

		var tag = req.params.tag;
		designerItemModel.DesignerItem.find({"tags": tag}).exec(callback);
		function callback(err, designerItems){
			altItemModel.AltItem.find({"tags": tag}).exec(callbackalt);
			function callbackalt(err, altItems){
				for(var i = 0; i<altItems.length; i++){
					if(myalikes.indexOf(altItems[i]._id) != -1){
						altItems[i] = altItems[i].toObject();
						altItems[i].liked = '1';
					}
				}
				for(var i = 0; i<designerItems.length; i++){
					if(mydlikes.indexOf(designerItems[i]._id) != -1){
						designerItems[i] = designerItems[i].toObject();
						designerItems[i].liked = '1';
					}
				}
				var toPass = { 
					"user": { 
						"name": req.session.user,
						"imageURL": req.session.imageURL
					},
					"tag": tag,
					"designerItems": designerItems,
					"altItems": altItems
				};
				res.render('tags', toPass)
			}
		}
	}
}
else{
	res.render('index');
}
}
