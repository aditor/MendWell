var express = require('express');
var router = express.Router();
var ctrlBlocks = require('../controllers/blocks');
var ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/', ctrlBlocks.blocklist);
router.get('/block', ctrlBlocks.blockInfo);
router.get('/block/edit', ctrlBlocks.addBlock);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;