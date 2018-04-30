var mongoose = require('mongoose');
var Condition = mongoose.model('Condition');
var request = require('request');
var osmosis = require('osmosis');
var Promise = require('promise');

var appId = 'a0688df7';
var appKey = 'b12e2d04580c6ecfc40c89764e2eaf32';
var FINAL = [];

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var listRelated = function(res, ailmentList) {
	var finalArr = [];

	var PromiseList = ailmentList.map((item) => {
		return new Promise((resolve, reject) => {
			var resultArr = [];
			var ailment = item.common_name;
			var formattedQuery = ailment.replace(/ /g,"&");
			console.log("queryyyyy " + formattedQuery);
			osmosis
				.get('http://www.webmd.com/drugs/2/search?type=conditions&query=' + formattedQuery)
				.find('p + ul')
				.then(function(context, data, next) {
				  var items = context.find('li');
				  var last = [];
				  items.forEach(function(item) {
				        next(item, data)
				  })
				  console.log("fuckshit" + items);
				})
				.set({'name': osmosis.set('name'),'link':'@href'})
				.data(function(results) { //output
				    resultArr.push(results)
				 })
				.done(function(){
					resolve({category: ailment, payLoad: resultArr});
					console.log("RESULT: " + resultArr);
				});

		})
	});

	Promise.all(PromiseList).then(function(data){
		finalArr.push(data);
	    sendJsonResponse(res, 200, finalArr);	
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
		 });
}

// Input symptoms and get back the condition
module.exports.translateSymptoms = function(req, res){
	var reqparams = req.body["symptomList"];
	reqparams = reqparams.join(" ");
	console.log("SYMPTOMLIST" + reqparams);

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
	        console.log("Mentions")
	        console.log(JSON.stringify(body));

	        var evidenceList = [];

	        body.mentions.forEach(function(medItem){
	        	evidenceList.push({
	        		"id": medItem.id,
	        		"choice_id": medItem.choice_id
	        	})
	        })

	        console.log(evidenceList);

			var options2 = {
			  url: 'https://api.infermedica.com/v2/diagnosis',
			  method: 'POST',
			  headers: {
			    'App-Id': appId,
	            'App-Key': appKey
			  },
			  json: true,
			  body:    {
			  	// Get these values from user and also enable multiple symptom entry
							"sex": "male",
						    "age": 30,
						    "evidence": evidenceList
						}
			};
			request(options2, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        // Print out the response body
			        	console.log("BODY" + JSON.stringify(body.conditions));

			        	listRelated(res, body.conditions);
			        

			        	/*var condName = body["mentions"][0]["name"];
			        	console.log(condName)
			        	listRelated(res, condName)*/
			    }
			})
	    }
	})
}


// Sort by date ?
module.exports.conditionsCreate = function (req, res) {
	//getAuthor(req, res, function (req, res, userName) {
		Condition.create({
			/*owner: userName,*/
			name: req.body.name,
			medList: req.body.medList,
			severity: req.body.severity
			}, function(err, condition){
				if(err){
					sendJsonResponse(res, 400, err);
				} else {
					sendJsonResponse(res, 201, condition);
				}
			});
	//});	
};

var User = mongoose.model('User');
var getAuthor = function(req, res, callback) {
	if (req.payload && req.payload.email) {
	User
	.findOne({ email : req.payload.email })
	.exec(function(err, user) {
		if (!user) {
			sendJSONresponse(res, 404, {
			"message": "User not found"
			});
			return;
		} else if (err) {
			console.log(err);
			sendJSONresponse(res, 404, err);
			return;
		} 
		callback(req, res, user.name);
	});
	} else {
		sendJSONresponse(res, 404, {
		"message": "User not found"
		});
		return;
	}
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
					sendJsonResponse(res, 404, {"message":"1No conditionid in request"});
					return;
				} else if (err){
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, condition);
		    });
	} else {
		sendJsonResponse(res, 404, {"message":"2No conditionid in request"});
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
			condition.medList = req.body.medList;
			// condition.updatedLast = Date.now();
			console.log("all changed")
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