var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	console.log("using production")
	apiOptions.server = "https://glacial-plateau-67879.herokuapp.com";
}

var renderHomepage = function(req, res, responseBody){
	res.render('conditions-list', {
		    pageHeader: {
				title: 'MendWell',
				strapline: 'Track your medications and wellbeing'
	        }, 
	        conditions: responseBody
		}		    		     
	); 
};

/* GET 'home' page, list ALL conditions */
module.exports.conditionlist = function(req, res){
	var requestOptions, path;
	path = '/api/conditions';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			console.log(body);
			renderHomepage(req, res, body);
		}
	);
};


var renderDetailPage = function (req, res, responseBody) {
	res.render('conditions-info', {
		    pageHeader: {
				title: 'MendWell',
				strapline: 'Track your medications and wellbeing'
	        }, 
	        condition: responseBody
		}		    		     
	); 
};

/* GET 'condition info' page about a certain condition to add/remove medications or even
change condition name*/
module.exports.conditionInfo = function(req, res){
	var requestOptions, path;
	path = "/api/conditions/" + req.params.conditionid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			console.log(body);
		    renderDetailPage(req, res, body);
	    }
	);
};

/* GET 'Add condition' page */
module.exports.addCondition= function(req, res){
	res.render('conditions-edit', { title: 'Edit condition' });
};

module.exports.doAddCondition = function(req, res){
	var reqestOptions, path, postdata, medArray;
	path = "/api/conditions";

	var input = req.body.condInfo;
	var conditionName = input.shift();

	var medArr = [];
	input.forEach(function(item){
		medArr.push({
			medName: item,
		    medDosage: "3"
		})
	})

	var postdata = {
		name: conditionName,
		medList: medArr,
		severity: 9
	}

	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	}

	request(
		requestOptions,
		function(err, response, body){
			if(err){
				console.log(err);
			}
			if(response.statusCode === 201){
				// Redirect to details page if added successfully
				res.redirect('/');
			}
		}
	)
}

module.exports.doDeleteCondition = function(req, res){
	var reqestOptions, path;
	path = "/api/conditions/" + req.params.conditionid;

	requestOptions = {
		url: apiOptions.server + path,
		method: "DELETE",
		json: {}
	}

	request(
		requestOptions,
		function(err, response, body){
			if(err){
				console.log(err);
			}
			if(response.statusCode === 201){
				// Redirect to details page if added successfully
				res.redirect('../../');
			}
		}
	)
}

