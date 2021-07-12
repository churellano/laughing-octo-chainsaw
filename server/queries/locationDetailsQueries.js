// const connectionString =
const LocationDetails = require('../schemas/locationDetailsSchema');

async function findLocationDetails(placeId) {
  return await LocationDetails.findOne({ placeId })
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