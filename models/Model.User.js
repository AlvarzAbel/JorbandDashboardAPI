const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    profile: {
        type: Array,
        require: true
    },
    planContributions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_REGISTER_FINANCES'
    }],
    controlConstructionPromises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_CONTRIBUTIONS_RECORD'
    }],
    controlTithes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_CONTRIBUTIONS_RECORD'
    }],
    controlContributions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TAB_CONTRIBUTIONS_RECORD'
    }]
})

module.exports = mongoose.model('TAB_USER', UserSchema);