const ContributionModel = require('../models/Model.ContributionsRecord');
const UserModel = require('../models/Model.User');

const service = {
    createPromiseControl: createPromiseControl,
    getPromiseControl: getPromiseControl
}

async function createPromiseControl(req) {

    try {
        const promiseControl = new ContributionModel({
            user: req.body.userId,
            category: 'PROMISES',
            month: req.body.month,
            status: 'COMPLETED',
            created_by: req.user.email
        })

        const user = await UserModel.findOne({ _id: req.body.userId, });
        if (!user) throw error

        await UserModel.findByIdAndUpdate({ _id: req.body.userId, }, { $push: { controlConstructionPromises: promiseControl._id } })

        const promise = await promiseControl.save();

        return promise;
    } catch (error) {
        throw error;
    }
}

async function getPromiseControl() {
    const controlList = await ContributionModel.find({category: 'PROMISES'});
    return controlList;
}

module.exports = service;