var mongoose = require('mongoose');

AltItemSchema = mongoose.Schema({
	"brand": String,
	"name": String,
	"price": Number,
	"description": String,
	"type": String,
	"image": String,
	"likes": Number,
	"tags": [String],
	"designerMatch": mongoose.Schema.Types.ObjectId
});

exports.addAltItem = function(req, res) {
	alert("not yet implemented"); //TODO
}

exports.AltItem = mongoose.model('AltItem', AltItemSchema);


