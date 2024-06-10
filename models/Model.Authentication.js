const mongoose = require('mongoose');

const AuthenticationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_USER',
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('TAB_USER_AUTHENTICATION', AuthenticationSchema)