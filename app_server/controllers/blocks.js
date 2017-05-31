/* GET 'home' page */
module.exports.blocklist = function(req, res){
	res.render('blocks-list', {
								pageHeader: {
										title: 'MendWell',
										strapline: 'Track your medications and wellbeing'
							    }, 
							    days: [{date: '05/08/2017',
							    		conditions:[
							    			{name: "Headache",
							    			 meds: [
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
								    					  }	],
							    			 severity: 5},
							    			{name: "Dizziness",
							    			 meds: [
							    			 		    {
								    					  	medName:'Percocet',
								    						medDosage: '1 pills/day'
								    					},
								    					{
								    					  	medName:'Valium',
								    						medDosage: '3 spoonfulls/day'
								    					}],
							    			 severity: 8}
							    		]},

							    		{date: '05/09/2017',
							    		conditions:[
							    			{name: "Vomitting",
							    			 meds: [
							    			 		      {
								    						medName:'Buckleys',
								    						medDosage: '1 pills/day'
								    					  },
								    					  {
								    					  	medName:'Erythropoeitin',
								    						medDosage: '2 pills/day'
								    					  }],
							    			 severity: 9},
							    			{name: "Diarreah",
							    			 meds: [
							    			 		    {
								    					  	medName:'Antihistamine',
								    						medDosage: '1 pills/day'
								    					}],
							    			 severity: 3}
							    		]}	
							    ]	
							  }						    		     
			  ); 
};

/* GET 'block info' page */
module.exports.blockInfo = function(req, res){
	res.render('blocks-info', {
								pageHeader: {
										title: 'MendWell',
										strapline: 'Track your medications and wellbeing'
							    }, 
							    days: [{date: '05/08/2017',
							    		conditions:[
							    			{name: "Headache",
							    			 meds: [
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
								    					  }	],
							    			 severity: 5},
							    			{name: "Dizziness",
							    			 meds: [
							    			 		    {
								    					  	medName:'Percocet',
								    						medDosage: '1 pills/day'
								    					},
								    					{
								    					  	medName:'Valium',
								    						medDosage: '3 spoonfulls/day'
								    					}],
							    			 severity: 8}
							    		]}
							    ]	
							  });
};

/* GET 'Add block' page */
module.exports.addBlock = function(req, res){
	res.render('blocks-edit', { title: 'Edit block' });
};