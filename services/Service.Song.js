const SongModel = require('../models/Model.Song');

const service = {
    getRandomSong: getRandomSong,
    createSong: createSong,
    getSongList: getSongList,
    updateUsageSong: updateUsageSong,
    deleteSong : deleteSong,
}

async function getRandomSong(chords, limit) {

    const ramdonSongs = await SongModel.aggregate([
        { $match: { chord: { $in: chords } } },
        { $sample: { size: parseInt(limit) } }
    ]).project({ name: 1, chord: 1, _id: 1 });
    return ramdonSongs;

}

async function createSong(req) {

    const song = new SongModel({
        name: req.body.name,
        chord: req.body.chord,
        category: req.body.category,
        usage: 0
    })
    const newSong = await song.save();
    return newSong;
}

async function deleteSong(id){
    const song = await SongModel.findByIdAndDelete(id);
    if(!song){
        return 'Document not found';
    }
    return 'Document deleted';
}

async function getSongList() {
    const list = await SongModel.find().sort({usage: 1});
    return list;
}

async function updateUsageSong(id) {
    const song = await SongModel.findOne({ _id: id });
    if (!song) return "Song not found";

    const currentUsage = song.usage;

    const updateSong = await SongModel.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                usage: currentUsage + 1
            }
        }, { new: true })
    return updateSong;
}

module.exports = service;