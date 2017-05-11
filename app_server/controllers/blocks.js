/* GET 'home' page */
module.exports.blocklist = function(req, res){
	res.render('blocks-list', { title: 'Home' });
};

/* GET 'block info' page */
module.exports.blockInfo = function(req, res){
	res.render('blocks-info', { title: 'Block info' });
};

/* GET 'Add block' page */
module.exports.addBlock = function(req, res){
	res.render('blocks-edit', { title: 'Edit block' });
};