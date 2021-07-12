// const connectionString =
const LocationReview = require('../schemas/locationReviewSchema');
const ObjectId = require('mongoose').Types.ObjectId; 

async function findLocationReviews(locationId) {
  const locationReviews = await LocationReview
    .find({ locationId: new ObjectId(locationId) })
    .populate('user')
    .sort({'postedDate': -1})
    .limit(5);

  return locationReviews;
}

async function createLocationReview(locationId, userId, description, recommend) {
    return new LocationReview({
      locationId,
      user: userId,
      description,
      postedDate: new Date(),
      recommend
    }).save();
}

module.exports = {
    findLocationReviews,
    createLocationReview
}