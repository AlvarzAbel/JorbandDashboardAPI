const express = require('express');
const root = express.Router();
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const User = require('../models/Model.User');
const authVerification = require('../middlewares/Middleware.AuthVerification')

root.use(express.Router());

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

let projectId = 'jorbandapi';
let keyFilename = 'myKey.json';

const storage = new Storage({
    projectId,
    keyFilename,
});

const bucket = storage.bucket('jorband_storage');

root.post('/', authVerification, multer.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) return res.status(500).json({ Error: "no se recibio ningun Archivo" });

        const name = `profile-${Date.now()}-${req.file.originalname}`

        const blob = bucket.file(name);
        const blobStream = blob.createWriteStream();
        blobStream.on('finish', () => {
            console.log('IMG Uploaded successfully');
        });

        const resp = await User.findOneAndUpdate({ email: req.user.email },
            {
                $set: {
                    profilePicture: name
                }
            }, { new: true })
        blobStream.end(req.file.buffer);
        res.json({ message: resp });

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = root;
