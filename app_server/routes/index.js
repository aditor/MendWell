var express = require('express');
var router = express.Router();
var ctrlConditions = require('../controllers/conditions');
var ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/', ctrlConditions.conditionlist);
router.get('/condition/:conditionid', ctrlConditions.conditionInfo);
router.get('/condition/edit', ctrlConditions.addCondition);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;