// const connectionString =
const mongoose = require('mongoose');
const locationSchema = require('../schemas/locationSchema');
const Location = mongoose.model('location', locationSchema, 'location');

async function findLocation(username) {
    return await User.findOne({ username })
  }

async function createLocation(name, address) {
    return new Location({
      name,
      address,
      upvotes: 0,
      downvotes: 0
    }).save();
}

module.exports = {
    findLocation,
    createLocation
}