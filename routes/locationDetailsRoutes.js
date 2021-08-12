var express = require('express');
var router = express.Router();

const { findLocationDetails, findNearestLocationDetails, createLocationDetails} = require('../queries/locationDetailsQueries');

/* GET LocationDetails by placeId. */
router.get('/:placeId', async (req, res) => {
  const placeId = req.params.placeId;
  const locationDetails = await findLocationDetails(placeId);
  locationDetails ? res.send(locationDetails) : res.sendStatus(404);
});

/* GET nearest LocationDetails by coordinates. */
router.get('/getNearestLocationDetails/:lat,:long', async (req, res) => {
  const { lat, long } = req.params;

  const nearestLocationDetails = await findNearestLocationDetails(lat, long);
  res.send(nearestLocationDetails);
});

/* POST LocationDetails */
router.post('/', async (req, res) => {
  const placeId = req.params.placeId;
  const { name, address } = req.body;   const locationDetails = await createLocationDetails(placeId, name, address);

  res.send(locationDetails);
});


module.exports = router;
