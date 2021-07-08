const mongoose = require('mongoose');

const schema = mongoose.Schema({
    placeId: String,
	name: String,
    address: String,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model('LocationDetails', schema)