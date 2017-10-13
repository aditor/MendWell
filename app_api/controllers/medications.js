var mongoose = require('mongoose');
var Condition = mongoose.model('Condition');
var request = require('request');
var osmosis = require('osmosis');

var appId = 'a0688df7';
var appKey = 'b12e2d04580c6ecfc40c89764e2eaf32';
var FINAL = [];


var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//sort by date ?

// GET
module.exports.medsReadOne = function (req, res) {
	Condition
		.findById(req.params.conditionid)
		.select('name medList')
		.exec(function(err, condition) {
			var response, med
			if (!condition) {sendJsonResponse(res, 404, {"message": "conditionid not found"});
				return;
			} else if (err){
				sendJsonResponse(res, 400, err);
				return;
			}

			if(condition.medList){
				med = condition.medList.id(req.params.medid);
				if(!med){
					sendJsonResponse(res, 404, {"message":"medId not found"});
				} else {
					response = {
						condition : {
							name: condition.name,
							id: req.params.conditionid
						},
						med: med
					};
					// SUCCESS
					sendJsonResponse(res, 200, response);
				}
			} else {
				sendJsonResponse(res, 404, {"message":"No medications found"});
			}
	    });
};




module.exports.medsCreate = function (req, res) {
	Condition
		.find({})
		.sort('-date')
		.exec(function(err, docs) {
		sendJsonResponse(res, 200, docs);
	}); 
};



module.exports.medsUpdateOne= function (req, res) {
	Condition
		.findById(req.params.dayid)
		.exec(
		function(err, day) {
			day.name = req.body.name;
			day.save(function(err, day) {
				if (err) {
				sendJsonResponse(res, 404, err);
				} else {
				sendJsonResponse(res, 200, day);
				}
			});
		}
		);
};

module.exports.medsDeleteOne= function (req, res) { };