var mongoose = require( 'mongoose' );

// models
var medSchema = new mongoose.Schema({
	medName: {type: String, required: true},
	medDosage: {type: String, required: true},
	createdOn: {type: Date, "default": Date.now},
	updatedLast: {type: Date, "default": Date.now}
})
var conditionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	medList: [medSchema],
	severity: {type:Number, "default": 0},
	createdOn: {type: Date, "default": Date.now},
	updatedLast: {type: Date, "default": Date.now}
})

mongoose.model('Condition', conditionSchema);