const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema({

    category: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_USER'
    }
})

module.exports = mongoose.model('TAB_FINANCES_ACTIVITY', ActivitySchema)