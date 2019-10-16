const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const TransactionSchema = new Schema({
    sender_accNo: {
        type: String,
        required: true
    },
    receiver_accNo: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },

});

module.exports = Transaction = mongoose.model('transactions', TransactionSchema);