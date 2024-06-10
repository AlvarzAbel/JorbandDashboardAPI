const mongoose = require('mongoose')

const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chord: {
        type: []
    },
    usage: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TAB_SONG', SongSchema)