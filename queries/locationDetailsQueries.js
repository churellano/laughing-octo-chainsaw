// const connectionString =
const LocationDetails = require('../schemas/locationDetailsSchema');

async function findLocationDetails(placeId) {
  return await LocationDetails.findOne({ placeId })
}

async function findNearestLocationDetails(lat, long) {
  return await LocationDetails.find({
    point: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat]
        },
        $maxDistance: 1000
      }
    }
  });
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
    findNearestLocationDetails,
    createLocationDetails
}