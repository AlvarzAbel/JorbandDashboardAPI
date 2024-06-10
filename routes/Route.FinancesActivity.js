const express = require('express');
const authVerification = require('../middlewares/Middleware.AuthVerification');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');
const service = require('../services/Service.FinancesActivity');

const root = express.Router();

root.use(express.Router());

root.get('/', authVerification, async (req, res) => {
    try {
        const list = await service.getActivities();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error);
    }
})

module.exports = root;