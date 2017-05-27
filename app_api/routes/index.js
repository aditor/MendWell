var express = require('express');
var router = express.Router();
var ctrlDays = require('../controllers/days');

router.get('/days', ctrlDays.listDays);
router.get('/morning', ctrlDays.translateSymptoms);
/*router.post('/days', ctrlDays.daysCreate);*/
router.get('/days/:dayid', ctrlDays.daysReadOne);
router.put('/days/:dayid', ctrlDays.daysUpdateOne);
router.delete('/days/:dayid', ctrlDays.daysDeleteOne);



/*// reviews - in my case might be the medications and body status

router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsDeleteOne);*/
module.exports = router;