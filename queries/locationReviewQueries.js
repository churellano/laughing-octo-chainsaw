// const connectionString =
const mongoose = require('mongoose');
const locationReviewSchema = require('../schemas/locationDetailsSchema');
const LocationReview = mongoose.model('LocationReview', locationReviewSchema, 'LocationReview');

async function findLocationReview(username) {
    return await LocationReview.findOne({ username })
  }

async function createLocationReview(locationId, username, description, recommend) {
    return new LocationReview({
      locationId,
      username,
      description,
      postedDate: new Date(),
      recommend
    }).save();
}

module.exports = {
    findLocationReview,
    createLocationReview
}