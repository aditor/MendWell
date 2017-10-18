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

// Sort by date ?

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
	var conditionid = req.params.conditionid;
	if(conditionid){
		Condition
		.findById(conditionid)
		.select('medList')
		.exec(function(err, condition) {
			if(err){sendJsonResponse(res,400,err)
				return;
			} else {
				doAddMed(req, res, condition);
			}
	    });
	} else {
		sendJsonResponse(res,404, {'message':'Not found, conditionid required'});
	}
};

var doAddMed = function(req,res,condition){
	if(!condition){sendJsonResponse(res, 404, {'message':'conditionid not found'});}
	else {
		condition.medList.push({
			medName: req.body.medName,
			medDosage: req.body.medDosage
		});
		condition.save(function(err, condition){
			var thisMed;
			if(err){sendJsonResponse(res, 400, err);
				return;
			} else {
				thisMed = condition.medList[condition.medList.length - 1];
				sendJsonResponse(res, 201, thisMed);
			}
		})
	}
}

module.exports.medsUpdateOne= function (req, res) {
	if(!req.params.conditionid || !req.params.medid){sendJsonResponse(res, 404, {'message':'Not found, both conditionid and medid are required'})
		return;
	}
	Condition
		.findById(req.params.conditionid)
		.select('reviews')
		.exec(
		function(err, condition) {
			var thisMed;
			if(!condition){sendJsonResponse(res, 404, {'message':'conditionid not found'})
				return;
		    } else if (err) {sendJsonResponse(res, 400, err)
				return;
			} else if (!condition.medList) {sendJsonResponse(res, 404, {'message':'No medications exist'})
				return;
			}
			thisMed = condition.medist.id(req.params.medid);
			if(!thisMed){sendJsonResponse(res, 404, {'message':'medid not found'});
		    } else {
		    	thisMed.medName = req.body.medName;
		    	thisMed.medDosage = req.body.medDosage;
		    	thisMed.updatedLast = Date.now;
		    	condition.save(function(err, condition){
		    		if(err){sendJsonResponse(res, 404, err);}
		    		else{sendJsonResponse(res, 200, thisMed);}	
		    	})
			}
		}
		);
};

module.exports.medsDeleteOne= function (req, res) {
	if(!req.params.conditionid || !req.params.medid){sendJsonResponse(res, 404, {'message':'Not found, both conditionid and medid required'})
		return; 
	}
	Condition
		.findById(req.params.conditionid)
		.select('medList')
		.exec(function(err, condition){
			if(!condition.medList || !condition.medList.id(req.params.medid)){
				sendJsonResponse(res, 404, {'message':'review not found'});
			} else {
				condition.medId.id(req.params.medid).remove();
				condition.save(function(err){
					if(err){sendJsonResponse(res, 404, err)}
					else {
						sendJsonResponse(res, 204, null);
					}
				})
			}
		})
};