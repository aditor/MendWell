var mongoose = require('mongoose');
var Day = mongoose.model('Day');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};



module.exports.daysCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status":"success"});
};
module.exports.listDays = function (req, res) { };
module.exports.daysReadOne = function (req, res) { };
module.exports.daysUpdateOne= function (req, res) { };
module.exports.daysDeleteOne= function (req, res) { };
