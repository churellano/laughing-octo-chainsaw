'use strict';

var express = require('express');
var router = express.Router();

const { getRecentLocationReviews, getLocationReviewsWithSkip, createLocationReview} = require('../queries/locationReviewQueries');

/* GET 5 most recent LocationReviews */
router.get('/getRecentLocationReviews/:locationId', async (req, res) => {
  const locationId = req.params.locationId;
  const locationReviews = await getRecentLocationReviews(locationId);

  console.log(locationId, locationReviews);
  locationReviews ? res.send(locationReviews) : res.sendStatus(404);
});

/* GET LocationReviews with skip*/
router.get('/:locationId', async (req, res) => {
  const locationId = req.params.locationId;
  const { skip, limit } = req.query;
  const locationReviewsWithCount = await getLocationReviewsWithSkip(locationId, parseInt(skip), parseInt(limit));

  console.log(locationId, locationReviewsWithCount);
  locationReviewsWithCount ? res.send(locationReviewsWithCount) : res.sendStatus(404);
});

/* POST a new LocationReview. */
router.post('/', async (req, res) => {
  const locationReview = await createLocationReview(req.body);
  res.send(locationReview);
});

module.exports = router;
