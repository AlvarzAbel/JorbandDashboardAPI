const mongoose = require('mongoose');

const ListSchema =  mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    songs: {
        type: [],
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_USER',
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('TAB_LIST_SONG', ListSchema)