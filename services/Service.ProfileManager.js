const UserModel = require('../models/Model.User');

const service = {
    addProfile: addProfile,
    removeProfile: removeProfile
}
async function addProfile(req, profile) {

    const resp = await UserModel.findByIdAndUpdate({ _id: req.body.userId }, {
        $push: {
            profile: profile
        }
    }, { new: true })

    return resp;
}

async function removeProfile(req, profile) {

    const resp = await UserModel.findByIdAndUpdate({ _id: req.body.userId }, {
        $pull: {
            profile: profile
        }
    }, { new: true })

    return resp;
}

module.exports = service;