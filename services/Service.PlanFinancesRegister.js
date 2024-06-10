const FinancesModel = require('../models/Model.FinancesRegister');
const UserModel = require('../models/Model.User');

const service = {
    createPlanRegister: createPlanRegister,
    getPlanRegisteList: getPlanRegisteList,
    getTotalPlan: getTotalPlan
}

async function createPlanRegister(req, date, amountPerDay) {

    const { body } = req;

    const register = new FinancesModel({
        user: body.userId,
        date: date,
        amount: amountPerDay,
        category: 'PLAN5',
        created_by: `${req.user.name}-${req.user.email}`
    })

    const user = await UserModel.findOne({ _id: body.userId });
    if (!user) return "User not found";

    await UserModel.findByIdAndUpdate({ _id: body.userId }, { $push: { planContributions: register._id } })
    const newRegister = await register.save();
    return newRegister;
}

async function getPlanRegisteList(req) {
    const list = await FinancesModel.find({ category: 'PLAN5' })
        .populate('user', '_id name email')
        .sort({ date: -1 });

    return list;
}

async function getTotalPlan() {

    const total = await FinancesModel.aggregate([
        {
            $match: { category: 'PLAN5' }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' }
            }
        }
    ])

    if (total.length === 0) {
        return 0;
    }

    const amount = total[0].totalAmount
    const totalAmount = total.length > 0 ? amount : 0;

    return totalAmount

}

module.exports = service;