const express = require('express');
const service = require('../services/Service.ProfileManager');
const profiles = require('../utils/Util.Profiles');
const verifyAuth = require('../middlewares/Middleware.AuthVerification');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.put('/remove', verifyAuth, async(req,res)=>{
    try {
        let resp; 
        for(let profile of req.body.profile){
            resp = await service.removeProfile(req, profile);
        }
        
        res.json({result: resp})
    } catch (error) {
        errorHandler(res, error);
    }
})

root.put('/add',verifyAuth, async (req, res)=>{
    try {
        let resp; 
        for(let profile of req.body.profile){
            resp = await service.addProfile(req, profile);
        }
        
        res.json({result: resp})
    } catch (error) {
        errorHandler(res, error);
    }
})

root.get('/', verifyAuth, async(req, res)=>{
    try {
        res.json({result: profiles});
    } catch (error) {
        errorHandler(res, error);
    }
})
module.exports = root;