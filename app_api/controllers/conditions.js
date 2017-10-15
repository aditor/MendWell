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

//
var listRelated = function(res, ailment) {
	var resultArr = [];
	osmosis
		.get('http://www.webmd.com/drugs/2/search?type=conditions&query=' + ailment)
		.find('p + ul')
		.then(function(context, data, next) {
		  var items = context.find('li');
		  var last = [];
		  items.forEach(function(item) {
		        next(item, data)
		  })
		})
		.set({'name': osmosis.set('name'),'link':'@href'})
		.data(function(results) { //output
		     resultArr.push(results)
		 })
		.done(function(){
			console.log(resultArr)
			sendJsonResponse(res, 200, resultArr)	
		})
}

module.exports.createMedList = function (req, res, ailment) {
	var reqparams = "http://www.webmd.com" + req.body["stuff"];
	console.log("LOOK HERE" + reqparams)
	var data = [];
	osmosis
		.get(reqparams)
		.find('tbody')
		.set({'medication':['//td[1]']})
		.data(function(results) { //output
			data.push(results)
		 })
		 .done(function(){
		 	sendJsonResponse(res, 200, data)
		 })
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
	        
	    
	        var symp = body[Object.keys(body)[0]][0].id;
	        console.log(symp);

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
			        	console.log(condName)
			        	listRelated(res, condName)
			    }
			})
	    }
	})
}


//sort by date ?

module.exports.conditionsCreate = function (req, res) {
	Condition.create({
		name: req.body.name,
		severity: req.body.severity
		}, function(err, condition){
			if(err){
				sendJsonResponse(res, 400, err);
			} else {
				sendJsonResponse(res, 201, condition);
			}
		});
};


module.exports.listConditions = function (req, res) {
	Condition
		.find({})
		.exec(function(err, docs) {
			if(err){
				sendJsonResponse(res, 404, err);
			} else {
				var conditions = [];
				sendJsonResponse(res, 200, docs);
			}
		}); 
};

module.exports.conditionsReadOne = function (req, res) {
	if (req.params && req.params.conditionid) {
		Condition
		    .findById(req.params.conditionid)
			.exec(function(err, condition) {
				if(!condition){
					sendJsonResponse(res, 404, {"message":"No conditionid in request"});
					return;
				} else if (err){
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, condition);
		    });
	} else {
		sendJsonResponse(res, 404, {"message":"No conditionid in request"});
	}
};

module.exports.conditionsUpdateOne= function (req, res) {
	if(!req.params.conditionid){ sendJsonResponse(res, 404, {'message':'Not found, conditionid is required'})
		return; 
	}
	Condition
		.findById(req.params.conditionid)
		.select('-medList')
		.exec(
		function(err, condition) {
			if(!condition){sendJsonResponse(res, 404, {'message':'conditionid not found'})
				return;
		    } else if (err){sendJsonResponse(res, 404, err);
		    	return;
		    }
			condition.name = req.body.name;
			condition.severity = req.body.severity;
			condition.save(function(err, condition) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, condition);
				}
			});
		});
};

module.exports.conditionsDeleteOne= function (req, res) {
	var conditionid = req.params.conditionid;
	if(!conditionid){sendJsonResponse(res, 404, {'message':'No conditionid'})}
	Condition
		.findByIdAndRemove(conditionid)
		.exec(function(err, condition){
			if(err){sendJsonResponse(res, 404, err);
				return
			}
			sendJsonResponse(res, 204, null);
		});
};