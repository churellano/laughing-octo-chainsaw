'use strict';

var express = require('express');
var router = express.Router();

const { findLocationReviews, createlocationReview} = require('../queries/locationReviewQueries');

/* GET LocationReviews listing. */
router.get('/:locationId', async (req, res) => {
  const locationId = req.params.locationId;
  const locationReviews = await findLocationReviews(locationId);

  console.log(locationId, locationReviews);
  locationReviews ? res.send(locationReviews) : res.sendStatus(404);
});

module.exports = router;
