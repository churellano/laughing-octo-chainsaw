const User = require('../schemas/UserSchema');

async function findUserByUsername(username) {
    return await User.findOne({ username })
}

async function findUserByEmail(email) {
    return await User.findOne({ email })
}

async function signup(newUser) {
    return await User.create(newUser, (err) => {
        if (err) console.log('ERROR', err);
    });
}

async function login({ username, password }) {
    const existingUser = User.findOne({ username });
    return !!existingUser && existingUser.password === password;
}

module.exports = {
    findUserByUsername,
    findUserByEmail,
    signup,
    login
}