const mongoose = require('mongoose');

const schema = mongoose.Schema({
	locationId: mongoose.Schema.Types.ObjectId,
    username: String,
    description: String,
    postedDate: Date,
    recommend: Boolean
});

module.exports = mongoose.model('LocationReview', schema)