var mongoose = require('mongoose');
var Day = mongoose.model('Day');
var request = require('request');
var osmosis = require('osmosis');

var appId = 'a0688df7';
var appKey = 'b12e2d04580c6ecfc40c89764e2eaf32';
var FINAL = [];


var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var osmosize = function (res, ailment) {
	osmosis
		.get('http://www.webmd.com/drugs/2/search?type=conditions&query=' + ailment)
		.find('p + ul')
		.then(function(context, data, next) {
		  var items = context.find('li');
		  var last = [];
		  console.log(Object.keys(items));
		  items.forEach(function(item) {
		        next(item, data);
		  })
		})
		.set('condition')
		.follow('@href')
		.set({'medication':['//td[1]']})
/*		.then(function(context, data, next){
			console.log(Object.keys(data).length)




		})*/
		.data(function(results) { //output
			console.log(Object.keys(results).length)
		    console.log("DONE")
			sendJsonResponse(res, 200, results)
		 })
		.log(console.log)
		.error(console.log)
		.debug(console.log)
}

//input symptoms and get back the condition
module.exports.translateSymptoms = function(req, res){
	var reqparams = req.body["stuff"];
	console.log(reqparams);
	console.log(typeof(reqparams))
	var options = {
	  url: 'https://api.infermedica.com/v2/parse', 
	  method: 'POST',
	  headers: {
	    'App-Id': appId,
	    'App-Key': appKey
	  },
	  json: true,
	  body: {"text": reqparams}
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        
	        console.log(body[Object.keys(body)]);
	        var symp = body[Object.keys(body)[0]][0].id;

			var options2 = {
			  url: 'https://api.infermedica.com/v2/diagnosis',
			  method: 'POST',
			  headers: {
			    'App-Id': appId,
	            'App-Key': appKey
			  },
			  json: true,
			  body:    {
							"sex": "male",
						    "age": 30,
						    "evidence": [
						      {"id": symp, "choice_id": "present"}
						    ] 
						}
			};
			request(options, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        // Print out the response body
			        	var condName = body["mentions"][0]["name"];
			        	osmosize(res, condName)
			    }
			})
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