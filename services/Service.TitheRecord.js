const TitheControlModel = require('../models/Model.ContributionsRecord');
const UserModel = require('../models/Model.User');

const service = {
    createTitheControl: createTitheControl,
    getTitheControl: getTitheControl
}

async function createTitheControl(req) {

    try {
        const titheControl = new TitheControlModel({
            user: req.body.userId,
            month: req.body.month,
            category: 'TITHES',
            status: 'COMPLETED',
            created_by: req.user.email
        })

        const user = await UserModel.findOne({ _id: req.body.userId, });
        if (!user) throw error

        await UserModel.findByIdAndUpdate({ _id: req.body.userId,}, { $push: { controlTithes: titheControl._id } })

        const tithe = await titheControl.save();

        return tithe;
    } catch (error) {
        throw error;
    }
}

async function getTitheControl() {
    const controlList = await TitheControlModel.find({category: 'TITHES'});
    return controlList;
}

module.exports = service;