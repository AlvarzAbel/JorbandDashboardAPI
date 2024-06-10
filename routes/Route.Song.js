const express = require('express');
const service = require('../services/Service.Song')
const songListService = require('../services/Service.SongList');
const errorHandler = require('../middlewares/Middleware.ErrorHandler');
const authVerification = require('../middlewares/Middleware.AuthVerification')

const root = express.Router();
root.use(express.Router());

root.get('/', authVerification, async (req, res) => {
    try {
        const listCount = await songListService.getSongListCount();
        const list = await service.getSongList();
        res.json({ result: list, listCount });
    } catch (error) {
        errorHandler(res, error)
    }
})

root.post('/', authVerification, async (req, res) => {
    try {
        const randomList = await service.getRandomSong(req.body.chords, req.body.amount)
        res.json({
            result: randomList
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

root.post('/create', authVerification, async (req, res) => {
    try {

        const song = await service.createSong(req)
        res.json({
            result: song
        })
    } catch (error) {
        errorHandler(res, error)
    }
})

root.post('/delete', authVerification, async (req, res) => {
    try {
        let response;
        for (const song of req.body.song) {
            response = await service.deleteSong(song._id);
        }
        res.json({ result: response })
    } catch (error) {
        errorHandler(res, error)
    }
})

module.exports = root;