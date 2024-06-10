const RegisterModel = require('../models/Model.FinancesRegister');

const service = {
    createRegister: createRegister,
    getRegisterList: getRegisterList,
    getTotalAmount: getTotalAmount
}
async function createRegister(req) {

    const register = new RegisterModel({
        category: 'INCOMES',
        amount: req.body.amount,
        date: req.body.date[0],
        description: req.body.description,
        created_by: req.user.email,

    })

    const newRegister = await register.save();
    return newRegister;
}

async function getRegisterList() {
    const registerList = await RegisterModel.find({ category: 'INCOMES' });
    return registerList;
}

async function getTotalAmount() {
    const total = await RegisterModel.aggregate([
        {
            $match: { category: 'INCOMES' }
        },
        {
            $group: { _id: null, totalAmount: { $sum: '$amount' } }
        }
    ])
    if (total.length === 0) {
        return 0
    }

    const amount = total[0].totalAmount
    const totalAmount = total.length > 0 ? amount : 0;

    return totalAmount
}

module.exports = service;