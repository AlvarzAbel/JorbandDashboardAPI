const express = require('express');
const authVerification = require('../middlewares/Middleware.AuthVerification')
const errorHandler = require('../middlewares/Middleware.ErrorHandler');
const contributionService = require('../services/Service.ContributionsRecord');
const promiseService = require('../services/Service.PromisesRecord');
const titheService = require('../services/Service.TitheRecord');

const root = express.Router();
root.use(express.Router());

const contribution = 'contribution';
const promise = 'promises';
const tithe = 'tithe';

root.post('/', authVerification, async (req, res) => {

    try {
        const type = req.body.type;

        if (type === contribution) {
            for(let date of req.body.dates) {
                await contributionService.createContributionControl(req, date);
            }
        }

        if (type === promise) {
            await promiseService.createPromiseControl(req);
        }

        if (type === tithe) {
            await titheService.createTitheControl(req);
        }

        res.json({
            result: 'Control created successfully'
        })

    } catch (error) {
        errorHandler(res, error);
    }

})

module.exports = root;