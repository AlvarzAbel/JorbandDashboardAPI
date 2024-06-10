const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinanceSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'TAB_USER'
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TAB_REGISTER_FINANCES', FinanceSchema)