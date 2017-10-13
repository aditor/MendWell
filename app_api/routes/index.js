var express = require('express');
var router = express.Router();
var ctrlConditions = require('../controllers/conditions');
var ctrlMedications = require('../controllers/medications');


router.post('/morning', ctrlConditions.translateSymptoms);
router.post('/shit', ctrlConditions.createMedList);

router.get('/conditions', ctrlConditions.listConditions);
router.post('/conditions', ctrlConditions.conditionsCreate);
router.get('/conditions/:conditionid', ctrlConditions.conditionsReadOne);
router.put('/conditions/:conditionid', ctrlConditions.conditionsUpdateOne);
router.delete('/conditions/:conditionid', ctrlConditions.conditionsDeleteOne);

router.post('/conditions/:conditionid/medications', ctrlMedications.medsCreate);
router.get('/conditions/:conditionid/medications/:medicationid', ctrlMedications.medsReadOne);
router.put('/conditions/:conditionid/medications/:medicationid', ctrlMedications.medsUpdateOne);
router.delete('/conditions/:conditionid/medications/:medicationid', ctrlMedications.medsDeleteOne);
module.exports = router;