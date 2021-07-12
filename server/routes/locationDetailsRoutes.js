var express = require('express');
var router = express.Router();

const { findLocationDetails, createLocationDetails} = require('../queries/locationDetailsQueries');

/* GET LocationDetails by placeId. */
router.get('/:placeId', async (req, res) => {
  const placeId = req.params.placeId;
  const locationDetails = await findLocationDetails(placeId);
  locationDetails ? res.send(locationDetails) : res.sendStatus(404);
});

/* POST LocationDetails */
router.post('/', async (req, res) => {
  const placeId = req.params.placeId;
  const { name, address } = req.body; 
  const locationDetails = await createLocationDetails(placeId, name, address);

  res.send(locationDetails);
});


module.exports = router;
