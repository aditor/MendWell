var mongoose = require( 'mongoose' );


// models
var medication = new mongoose.Schema({
	medName: {type: String, required: true},
	medDosage: {type: String, required: true}
})
var bodyPart = new mongoose.Schema({
	part: {type: String, required: true},
	condition: {type:Number, "default": 0}
})
var daysSchema = new mongoose.Schema({
	date: String,
	medList: [medication],
	bodyStatus: [bodyPart]
})

mongoose.model('Day', daysSchema);