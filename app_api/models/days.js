var mongoose = require( 'mongoose' );


// models
var medication = new mongoose.Schema({
	medName: {type: String, required: true},
	medDosage: {type: String, required: true}
})
var condition = new mongoose.Schema({
	name: {type: String, required: true},
	medsNeeded: [medication],
	severity: {type:Number, "default": 0}
})
var daysSchema = new mongoose.Schema({
	date: String,
	conditionList: [condition]
})

mongoose.model('Day', daysSchema);