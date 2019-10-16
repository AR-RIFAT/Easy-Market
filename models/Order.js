const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const OrderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    supplier_id: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String
    },

});

module.exports = Order = mongoose.model('orders', OrderSchema);