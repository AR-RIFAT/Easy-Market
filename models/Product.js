const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const ProductSchema = new Schema({
    imagePath: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

});

module.exports = Product = mongoose.model('products', ProductSchema);