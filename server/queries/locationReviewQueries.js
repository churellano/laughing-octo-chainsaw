// const connectionString =
const LocationDetails = require('../schemas/locationDetailsSchema');
const LocationReview = require('../schemas/locationReviewSchema');
const ObjectId = require('mongoose').Types.ObjectId; 

async function findLocationReviews(locationId) {
  console.log('locationId', locationId);
  const locationReviews = await LocationReview
    .find({ locationDetails: new ObjectId(locationId) })
    .populate('user')
    .sort({'postedDate': -1})
    .limit(5);

  return locationReviews;
}

async function createLocationReview({ locationDetails, user, description, recommend }) {
  console.log('createLocationReview', locationDetails, user, description, recommend);
  let locationDetailsFromDb;
  let locationReview;

  if (locationDetails._id) {
    console.log('review existing location')
    locationDetailsFromDb = await LocationDetails.findOne({ _id: new ObjectId(locationDetails._id) }).exec();
    locationReview = await LocationReview.create({
      locationDetails: new ObjectId(locationDetails._id),
      user: new ObjectId(user._id),
      description,
      postedDate: new Date(),
      recommend
    });
  } else {
    console.log('review new location')
    locationDetailsFromDb = await LocationDetails.create({
      placeId: locationDetails.placeId,
      name: locationDetails.name,
      address: locationDetails.address,
      point: locationDetails.point
    });

    locationReview = await LocationReview.create({
      locationDetails: new ObjectId(locationDetailsFromDb._id),
      user: new ObjectId(user._id),
      description,
      postedDate: new Date(),
      recommend
    });
  }

  const upvotesOrDownvotes = recommend ? 'upvotes' : 'downvotes';
  await LocationDetails.findOneAndUpdate(
    { _id: locationDetailsFromDb._id },
    { 
      $inc: {
        [upvotesOrDownvotes]: 1
      } 
    }
  ).exec();

  return locationReview;
}

module.exports = {
    findLocationReviews,
    createLocationReview
}