const ContributionModel = require('../models/Model.ContributionsRecord');
const UserModel = require('../models/Model.User');

const service = {
    createContributionControl: createContributionControl,
    getContributionControl: getContributionControl
}

async function createContributionControl(req, date) {

    try {
        const contributionControl = new ContributionModel({
            user: req.body.userId,
            category: 'PLAN5',
            date: date,
            status: 'COMPLETED',
            created_by: req.user.email
        })

        const user = await UserModel.findOne({ _id: req.body.userId });
        if (!user) throw error

        await UserModel.findByIdAndUpdate({ _id: req.body.userId }, { $push: { controlContributions: contributionControl._id } })

        const contribution = await contributionControl.save();

        return contribution;
    } catch (error) {
        throw error;
    }
}

async function getContributionControl() {
    const controlList = await ContributionModel.find({category: 'PLAN5'});
    return controlList;
}

module.exports = service;