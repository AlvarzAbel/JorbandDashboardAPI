const AuthModel = require('../models/Model.Authentication');
const bcrypt = require('bcrypt');

const service = {
    createAuthCredential: createAuthCredential
}
async function createAuthCredential({ user, pass }) {
    const credential = new AuthModel({
        userId: user._id,
        username: user.email.toLowerCase(),
        password: bcrypt.hashSync(pass, 10),
        profile: user.profile,
        status: 'Approved'
    })
    const newCredential = credential.save();
    return newCredential;
}

module.exports = service;