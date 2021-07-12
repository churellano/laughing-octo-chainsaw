const mongoose = require('mongoose');

const schema = mongoose.Schema({
    placeId: String,
	name: String,
    address: String,
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0}
});

module.exports = mongoose.model('LocationDetails', schema, 'LocationDetails');