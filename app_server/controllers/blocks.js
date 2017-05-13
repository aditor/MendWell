/* GET 'home' page */
module.exports.blocklist = function(req, res){
	res.render('blocks-list', {
								pageHeader: {
										title: 'MendWell',
										strapline: 'Track your medications and wellbeing'
							    }, 
							    days: [{date: '05/07/2017',
							    		medications:[
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
							    		bodyStatus:[
							    					{part: 'Left leg',
							    					 condition: 3
							    					},
							    					{part: 'Right arm',
							    					 condition: 6
							    					},
							    					{part: 'Head',
							    					 condition: 9
							    					}
							    		]
							    },
							    {		date: '05/08/2017',
							    		medications:[
								    					  {
								    						medName:'Adderall',
								    						medDosage: '5 pills/day'
								    					  },
								    					  {
								    					  	medName:'Percocet',
								    						medDosage: '1 pills/day'
								    					  },
								    					  {
								    					  	medName:'Valium',
								    						medDosage: '3 spoonfulls/day'
								    					  }
							    		],
							    		bodyStatus:[
							    					{part: 'Left arm',
							    					 condition: 4
							    					},
							    					{part: 'Stomach',
							    					 condition: 9
							    					}
							    		]
							    }] 
							  }
			   ); 
};

/* GET 'block info' page */
module.exports.blockInfo = function(req, res){
	res.render('blocks-info', { title: 'Block info' });
};

/* GET 'Add block' page */
module.exports.addBlock = function(req, res){
	res.render('blocks-edit', { title: 'Edit block' });
};