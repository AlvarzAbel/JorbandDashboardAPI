const ActivityModel = require('../models/Model.FinancesActivity');
const UserModel = require('../models/Model.User');

const service = {
    getActivities: getActivities,
    createActiviy: createActiviy,
}

async function createActiviy(userEmail, category, amount) {

    const user = await UserModel.findOne({ email: userEmail });

    if (!user) { return 'User not found'; }

    const activity = new ActivityModel({
        category: category,
        created_by: user._id,
        amount: amount
    })
    const newActivity = await activity.save();
    return newActivity;
}

async function getActivities() {
    const list = await ActivityModel.find()
        .populate('created_by', 'name lastName').sort({ creation_date: -1 })
    return list;
}

module.exports = service;