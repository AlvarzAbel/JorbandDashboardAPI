const FinancesModel = require('../models/Model.FinancesRegister');

const service = {
    createExpense: createExpense,
    getExpenses: getExpenses,
    getTotalAmount: getTotalAmount
}

async function createExpense(req){
    const expense = new FinancesModel({
        category: 'EXPENSES',
        amount: req.body.amount,
        date: req.body.date[0],
        description: req.body.description,
        created_by: req.user.email
    })
    const newExpense = expense.save();
    return newExpense;
}

async function getExpenses(){
    const expensesList = await FinancesModel.find({category: 'EXPENSES'})
    return expensesList;
}

async function getTotalAmount() {
    const total = await FinancesModel.aggregate([
        {
            $match: { category: 'EXPENSES' }
        },
        {
            $group: { _id: null, totalAmount: { $sum: '$amount' } }
        }
    ])

    if (total.length === 0){
        return 0;
    }

    const amount = total[0].totalAmount
    const totalAmount = total.length > 0 ? amount : 0;

    return totalAmount
}

module.exports =  service;