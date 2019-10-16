const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bankAccNo: {
        type: String
    },

});

module.exports = User = mongoose.model('users', UserSchema);