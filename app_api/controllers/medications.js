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
module.exports.medsCreate = function (req, res) {
	Day.find({}).sort('-date').exec(function(err, docs) {
		sendJsonResponse(res, 200, docs);
	}); 
};

module.exports.medsReadOne = function (req, res) {
	Day.findById(req.params.dayid).exec(function(err, day) {
		sendJsonResponse(res, 200, day);
	});
};

module.exports.medsUpdateOne= function (req, res) {
	Day
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