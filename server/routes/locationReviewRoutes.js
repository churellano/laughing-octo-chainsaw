'use strict';

var express = require('express');
var router = express.Router();

const { findLocationReviews, createLocationReview} = require('../queries/locationReviewQueries');

/* GET LocationReviews listing. */
router.get('/:locationId', async (req, res) => {
  const locationId = req.params.locationId;
  const locationReviews = await findLocationReviews(locationId);

  console.log(locationId, locationReviews);
  locationReviews ? res.send(locationReviews) : res.sendStatus(404);
});

/* POST a new LocationReview. */
router.post('/', async (req, res) => {
  const locationReview = await createLocationReview(req.body);
  res.send(locationReview);
});

module.exports = router;
