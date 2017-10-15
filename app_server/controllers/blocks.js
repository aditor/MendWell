var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	console.log("using production")
	apiOptions.server = "https://glacial-plateau-67879.herokuapp.com";
}

var renderHomepage = function(req, res, responseBody){
res.render('blocks-list',   {
								    pageHeader: {
										title: 'MendWell',
										strapline: 'Track your medications and wellbeing'
							        }, 
							        conditions: responseBody
							    }		    		     
			  ); 
};



/* GET 'home' page, list ALL conditions */
module.exports.blocklist = function(req, res){
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
			renderHomepage(req, res, body);
		}
	);
};

/*res.render('blocks-list',   {
								    pageHeader: {
										title: 'MendWell',
										strapline: 'Track your medications and wellbeing'
							        }, 
							        conditions: [{
									                name: "Headache",
									    		    meds: [{
										    				medName:'Tylenol',
										    				medDosage: '3 pills/day'
										    			},
										    			{
										    			  	medName:'Aspirin',
										    				medDosage: '2 pills/day'
										    			},
										    			{
										    		     	medName:'Buckleys',
										    			    medDosage: '2 spoonfulls/day'
										    			}],
							    			        severity: 5
							    			    },
							    			    {
							    			    	name: "Dizziness",
							    			        meds: [{
								    					  	medName:'Percocet',
								    						medDosage: '1 pills/day'
								    					},
								    					{
								    					  	medName:'Valium',
								    						medDosage: '3 spoonfulls/day'
								    					}
								    				],
							    			        severity: 8
							    			    },
							    			    {
							    			    	name: "Vomitting",
							    			        meds: [{
								    						medName:'Buckleys',
								    						medDosage: '1 pills/day'
								    					  },
								    					  {
								    					  	medName:'Erythropoeitin',
								    						medDosage: '2 pills/day'
								    					  }
								    			    ],
							    			        severity: 9}
							    		        ]
							    }		    		     
			  ); */

/* GET 'block info' page about a certain condition to add/remove medications or even
change condition name*/
module.exports.blockInfo = function(req, res){
	res.render('blocks-info',   {
									pageHeader: {
											title: 'MendWell',
											strapline: 'Track your medications and wellbeing'
								    }, 
								    condition: { 
								    	            name: "Headache",
								    			    meds:   [
								    			 		      {
									    						medName:'Tylenol',
									    						medDosage: '3 pills/day'
									    					  },
									    					  {
									    					  	medName:'Aspirin',
									    						medDosage: '2 pills/day'
									    					  },
									    					  {
									    					  	medName:'Buckleys',
									    						medDosage: '2 spoonfulls/day'
									    					  }	
									    					],
								    			    severity: 5
								    			}
								    }
			  );
};

/* GET 'Add block' page */
module.exports.addBlock = function(req, res){
	res.render('blocks-edit', { title: 'Edit block' });
};