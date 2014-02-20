var mongoose = require('mongoose');

DesignerItemSchema = mongoose.Schema({
	"brand": String,
	"name": String,
	"price": Number,
	"description": String,
	"image": String,
	"type": String,
	"likes": Number,
	"alts": [mongoose.Schema.Types.ObjectId]
});

exports.addDesignerItem = function(req, res) {
	alert("not yet implemented"); //TODO
}

exports.DesignerItem = mongoose.model('DesignerItem', DesignerItemSchema);