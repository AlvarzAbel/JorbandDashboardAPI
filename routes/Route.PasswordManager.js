const express = require('express')
const service = require('../services/Service.UpdatePassword');
const errorHandler = require('../middlewares/Middleware.ErrorHandler')
const root = express.Router();
root.use(express.Router());

root.put('/', async (req, res) => {
    try {
        const resp = await service.updatePassword(req);
        res.json({ result: resp })
    } catch (error) {
        errorHandler(res, error);
    }
})

module.exports = root;