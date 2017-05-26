var mongoose = require('mongoose');
var Day = mongoose.model('Day');
var request = require('request');


var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//input symptoms and get back the condition
module.exports.translateSymptoms = function(req, res){
	var options = {
	  url: 'https://api.infermedica.com/v2/parse', 
	  method: 'POST',
	  headers: {
	    'App-Id': 'a0688df7',
	    'App-Key': 'b12e2d04580c6ecfc40c89764e2eaf32'
	  },
	  json: true,
	  body:    {"text": "Pain in left foot"}
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        console.log(body);
	    }
	})
}


module.exports.sendAilments = function(req, res){
	var options = {
	  url: 'https://api.infermedica.com/v2/diagnosis',
	  method: 'POST',
	  headers: {
	    'App-Id': 'a0688df7',
	    'App-Key': 'b12e2d04580c6ecfc40c89764e2eaf32'
	  },
	  json: true,
	  body:    {
					"sex": "male",
				    "age": 30,
				    "evidence": [
				      {"id": "s_1193", "choice_id": "present"},
				      {"id": "s_488", "choice_id": "present"},
				      {"id": "s_418", "choice_id": "present"}
				    ] 
				}
	};
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        console.log(body);
	    }
	})
}

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