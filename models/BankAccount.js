const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BankSchema = new Schema({
  accNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

module.exports = BankAccount = mongoose.model('bankAccounts', BankSchema);
