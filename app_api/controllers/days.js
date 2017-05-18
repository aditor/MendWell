var mongoose = require('mongoose');
var Day = mongoose.model('Day');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};


//might not need to create a day, only UPDATE one
/*module.exports.daysCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status":"success"});
};
*/

//sort by date
module.exports.listDays = function (req, res) {
	Day.find({}).sort('-date').exec(function(err, docs) {
		sendJsonResponse(res, 200, docs);
	}); 
};

module.exports.daysReadOne = function (req, res) {
	Day.findById(req.params.dayid).exec(function(err, day) {
		sendJsonResponse(res, 200, day);
	});
};

module.exports.daysUpdateOne= function (req, res) {
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

module.exports.daysDeleteOne= function (req, res) { };
