const express = require('express');
const service = require('../services/Service.ExpensesRegister');
const activityService = require('../services/Service.FinancesActivity');
const  authVerification = require('../middlewares/Middleware.AuthVerification');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.post('/', authVerification, async (req, res) => {
    try {
        const expense = await service.createExpense(req);
        await activityService.createActiviy( req.user.email, 'EXPENSES', req.body.amount)
        res.json({ result: expense })

    } catch (error) {
        errorHandler(res, error);
    }
})

root.get('/', async (req, res) => {
    try {
        const expensesList = await service.getExpenses();
        res.json({ result: expensesList })
    } catch (error) {
        errorHandler(res, error);
    }
})

root.get('/total', authVerification, async(req, res) => {
    try {
        const total = await service.getTotalAmount();
        res.json({ result: total })
    } catch (error) {
        errorHandler(res, error);
    }
})

module.exports = root;