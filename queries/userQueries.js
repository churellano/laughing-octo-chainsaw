// const connectionString =
const User = require('../schemas/UserSchema');

async function findUser(username) {
    return await User.findOne({ username })
}

module.exports = {
    findUser,
    // createUser
}