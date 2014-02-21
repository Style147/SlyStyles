
exports.view = function(req, res) {
	var toPass = { "user":{ 
		"name":req.session.user,
		 "imageURL":req.session.imageURL}};
	res.render('setttings', toPass);
}