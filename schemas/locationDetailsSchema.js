const mongoose = require('mongoose');
const pointSchema = require('./pointSchema');

const schema = mongoose.Schema({
    placeId: String,
	name: String,
    address: String,
    point: {
        type: pointSchema,
        index: '2dsphere',
        required: true
    },
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0}
});

module.exports = mongoose.model('LocationDetails', schema, 'LocationDetails');