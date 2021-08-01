const User = require('../schemas/UserSchema');

async function findUserByUsername(username) {
    return await User.findOne({ username })
}

async function findUserByEmail(email) {
    return await User.findOne({ email })
}

module.exports = {
    findUserByUsername,
    findUserByEmail
}