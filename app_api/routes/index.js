var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: "thisIsSecret",
	userProperty: 'payload'
});

var ctrlConditions = require('../controllers/conditions');
var ctrlMedications = require('../controllers/medications');
var ctrlAuth = require('../controllers/authentication');

router.post('/morning', ctrlConditions.translateSymptoms);
router.post('/shit', ctrlConditions.createMedList);

router.get('/conditions', /*auth, */ctrlConditions.listConditions);
router.post('/conditions', /*auth, */ctrlConditions.conditionsCreate);
router.get('/conditions/:conditionid', /*auth, */ctrlConditions.conditionsReadOne);
router.put('/conditions/:conditionid', /*auth,*/ ctrlConditions.conditionsUpdateOne);
router.delete('/conditions/:conditionid', /*auth, */ctrlConditions.conditionsDeleteOne);

router.post('/conditions/:conditionid/medications', auth, ctrlMedications.medsCreate);
router.get('/conditions/:conditionid/medications/:medicationid', auth, ctrlMedications.medsReadOne);
router.put('/conditions/:conditionid/medications/:medicationid', auth, ctrlMedications.medsUpdateOne);
router.delete('/conditions/:conditionid/medications/:medicationid', auth, ctrlMedications.medsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;