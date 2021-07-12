const mongoose = require('mongoose');

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
});

module.exports = mongoose.model('User', schema, 'User')