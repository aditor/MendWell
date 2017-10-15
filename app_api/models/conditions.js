var mongoose = require( 'mongoose' );


// models
var medSchema = new mongoose.Schema({
	medName: {type: String, required: true},
	medDosage: {type: String, required: true}
})
var conditionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	medList: [medSchema],
	severity: {type:Number, "default": 0}
})


mongoose.model('Condition', conditionSchema);