const mongoose = require('mongoose');

const ContributionsRecord = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_USER',
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    month: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('TAB_CONTRIBUTIONS_RECORD', ContributionsRecord);