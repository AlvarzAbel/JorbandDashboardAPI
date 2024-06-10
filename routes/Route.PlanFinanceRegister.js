const express = require('express');
const service = require('../services/Service.PlanFinancesRegister');
const activityService = require('../services/Service.FinancesActivity');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');
const authVerification = require('../middlewares/Middleware.AuthVerification');

const root = express.Router();
root.use(express.Router());

root.post('/create', authVerification, async (req, res) => {
    try {
        const amountPerDay = req.body.amount / req.body.dates.length;

        let resp = ''

        for (let date of req.body.dates) {
            resp = await service.createPlanRegister(req, date, amountPerDay);
        }
        await activityService.createActiviy( req.user.email, 'INCOMES', req.body.amount)
        res.json({
            result: resp
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/get', authVerification, async (req, res) => {
    try {
        const contributionList = await service.getPlanRegisteList();
        res.json({
            result: contributionList
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/total', authVerification, async (req, res) => {
    try {
        const contributionList = await service.getTotalPlan();
        res.json({
            result: contributionList
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

module.exports = root;