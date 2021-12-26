// const connectionString =
const LocationDetails = require('../schemas/locationDetailsSchema');
const LocationReview = require('../schemas/locationReviewSchema');
const User = require('../schemas/userSchema');
const ObjectId = require('mongoose').Types.ObjectId; 

async function getLocationReviewsByUsernameWithSkip(username, skip, limit) {
  const { _id } = await User.findOne({ username });
  const locationReviews = await LocationReview
    .find({ user: new ObjectId(_id) })
    .populate('user')
    .sort({'postedDate': -1})
    .skip(skip)
    .limit(limit);
  const count = await LocationReview.find({ user: new ObjectId(_id) }).countDocuments();

  return { locationReviews, count };
}

async function getRecentLocationReviews(locationId) {
  console.log('locationId', locationId);
  const locationReviews = await LocationReview
    .find({ locationDetails: new ObjectId(locationId) })
    .populate('user')
    .sort({'postedDate': -1})
    .limit(5);

  return locationReviews;
}

async function getLocationReviewsWithSkip(locationId, skip, limit) {
  const locationReviews = await LocationReview
    .find({ locationDetails: new ObjectId(locationId) })
    .populate('user')
    .sort({'postedDate': -1})
    .skip(skip)
    .limit(limit);

  const count = await LocationReview.find({ locationDetails: new ObjectId(locationId) }).countDocuments();

  return { locationReviews, count };
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
  getLocationReviewsByUsernameWithSkip,
  getRecentLocationReviews,
  getLocationReviewsWithSkip,
  createLocationReview
}