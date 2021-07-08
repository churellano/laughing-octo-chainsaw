// const connectionString =
const mongoose = require('mongoose');
const locationDetailsSchema = require('../schemas/locationDetailsSchema');
const LocationDetails = mongoose.model('locationDetails', locationDetailsSchema, 'locationDetails');

async function findLocationDetails(username) {
    return await LocationDetails.findOne({ username })
  }

async function createLocationDetails(placeId, name, address) {
    return new LocationDetails({
      placeId,
      name,
      address,
      upvotes: 0,
      downvotes: 0
    }).save();
}

module.exports = {
    findLocationDetails,
    createLocationDetails
}