const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function findUserByUsername(username) {
    return await User.findOne({ username })
}

async function findUserByEmail(email) {
    return await User.findOne({ email })
}

async function signup(newUser) {
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds);
    return await User.create({ ...newUser, password: passwordHash});
}

async function login({ identifier, password }) {
    const existingUser = await User.findOne({ email: identifier }) || await User.findOne({ username: identifier });
    const match = await bcrypt.compare(password, existingUser.password);
    return match && existingUser;
}

module.exports = {
    findUserByUsername,
    findUserByEmail,
    signup,
    login
}