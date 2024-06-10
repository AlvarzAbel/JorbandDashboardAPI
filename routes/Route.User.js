const express = require('express');
const userService = require('../services/Service.User');
const credentialServ = require('../services/Service.Authentication');
const authVerification = require('../middlewares/Middleware.AuthVerification')
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.post('/', async (req, res) => {
    try {
        const user = await userService.createUser(req);
        const pass = req.body.password;

        const credential = await credentialServ.createAuthCredential({ user: user, pass: pass });
        res.json({ result: user, credential })
    } catch (error) {
        errorHandler(res, error)
    }
})


root.get('/', async (req, res) => {
    try {
        const list = await userService.getUsers();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/list', authVerification, async (req, res) => {
    try {
        const list = await userService.getUserList();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/finances/contribution', authVerification, async (req, res) => {
    try {
        const list = await userService.getUserContribution();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/finances/control', authVerification, async (req, res) => {
    try {
        const list = await userService.getUsersFinancesControl();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/userFinances', authVerification, async (req, res) => {
    try {
        const list = await userService.getFinancesByUser(req.user.email);
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.get('/userInformation', authVerification, async (req, res) => {
    try {
        const userProfile = await userService.getUserInformation(req.user.email);
        res.json({ result: userProfile });
    } catch (error) {
        errorHandler(res, error);
    }
})

root.get('/userProfiles/:userId', authVerification, async (req, res) => {
    try {
        const userProfile = await userService.getUserProfile(req.params.userId);
        res.json({ result: userProfile });

    } catch (error) {
        errorHandler(res, error);
        
    }
})

root.put('/userInformation', authVerification, async (req, res) => {
    try {
        const user = await userService.updateUser(req);
        res.json({ result: user });
    } catch (error) {
        errorHandler(res, error);
    }
})
module.exports = root;