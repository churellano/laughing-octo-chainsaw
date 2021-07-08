var express = require('express');
var router = express.Router();

const { findLocationDetails, createLocationDetails} = require('../queries/locationDetailsQueries');

/* GET Location by placeId. */
router.get('/:placeId', async function(req, res, next) {
  const placeId = req.params.placeId;
  const location = await findLocationDetails(placeId);

  res.send(location);
});

module.exports = router;
