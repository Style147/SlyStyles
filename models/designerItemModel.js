var mongoose = require('mongoose');

DesignerItemSchema = mongoose.Schema({
	"brand": String,
	"name": String,
	"price": Number,
	"description": String,
	"image": String,
	"type": String,
	"likes": Number,
	"buylink": String,
	"alts": [mongoose.Schema.Types.ObjectId]
});

exports.DesignerItem = mongoose.model('DesignerItem', DesignerItemSchema);