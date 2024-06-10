const express = require('express');
const service = require('../services/Service.IncomeRegister');
const activityService = require('../services/Service.FinancesActivity');
const authVerification = require('../middlewares/Middleware.AuthVerification');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.post('/', authVerification, async (req, res) => {
    try {
        const register = await service.createRegister(req);
        await activityService.createActiviy( req.user.email, 'INCOME', req.body.amount)
        res.json({ result: register });
    } catch (error) {
        errorHandler(res, error);
    }
})

root.get('/', authVerification, async (req, res) => {
    try {
        const registerList = await service.getRegisterList();
        res.json({ result: registerList });

    } catch (error) {
        errorHandler(res, error);
    }
})
root.get('/total', authVerification, async (req, res) => {
    try {
        const total = await service.getTotalAmount();
        res.json({
            result: total
        })
    } catch (error) {
        errorHandler(res, error);
    }
})
module.exports = root;