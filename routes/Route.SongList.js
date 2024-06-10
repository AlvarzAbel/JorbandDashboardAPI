const express = require('express');
const service = require('../services/Service.SongList');
const songService = require('../services/Service.Song');
const authVerification = require('../middlewares/Middleware.AuthVerification');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');

const root = express.Router();
root.use(express.Router());

root.get('/current', authVerification, async (req, res) => {
    try {
        const list = await service.getCurrentSongList();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
});

root.get('/', authVerification, async (req, res) => {
    try {
        const list = await service.getAllList();
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
});

root.get('/userLists', authVerification, async (req, res) => {
    try {
        const list = await service.getUserLists(req.user.email);
        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
});

root.post('/', authVerification, async (req, res) => {
    try {
        const list = await service.createSongList(req);

        for (const song of list.songs) {
            await songService.updateUsageSong(song._id)
        }

        res.json({ result: list });
    } catch (error) {
        errorHandler(res, error)
    }
})

module.exports = root;