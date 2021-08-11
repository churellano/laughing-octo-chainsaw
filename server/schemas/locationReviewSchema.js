const mongoose = require('mongoose');

const schema = mongoose.Schema({
    locationDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocationDetails'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    postedDate: Date,
    recommend: Boolean
});

module.exports = mongoose.model('LocationReview', schema, 'LocationReview');