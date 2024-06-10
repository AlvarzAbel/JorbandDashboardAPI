const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/Model.Authentication');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.post('/', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.email.toLowerCase() }).populate('userId', 'name lastName profilePicture profile');
        if (!user) return res.status(400).json({
            Error: 'OK',
            Message: "Email or Password is incorrect"
        })

        const correctPass = bcrypt.compareSync(req.body.password, user.password);

        if (!correctPass)
            return res.status(403).json({
                Error: 'Ok',
                Message: "Email or Password is incorrect"
            })

        const token = jwt.sign({ user: { _id: user._id, name: user.userId.name, email: user.username } }, 'secret', { expiresIn: '744h' })
        res.json({
            user: {
                name: user.userId.name + ' ' + user.userId.lastName,
                email: user.username,
                profile: user.userId.profile,
                profilePictureUrl: user.userId.profilePicture,


            },
            token: token
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

module.exports = root;