const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load Models
const BankAccount = require('../../models/BankAccount');
const Order = require('../../models/Order');
const Transaction = require('../../models/Transaction');

// @route   GET api/bank/test
// @desc    Tests bank route
// @access  Public

router.get('/test', (req, res) => res.json({
    msg:'admin is working....'
}));

// @route   POST api/admin/allOrders
// @desc    Get all orders
// @access  private
router.post('/allOrders', passport.authenticate( 'jwt', { session : false}), (req, res) => {
    if(req.body.check === "1"){
        Order.find({status: 'pending'})
        .then(orders => res.json({ok: true, order: orders}))
        .catch(err => res.json({ok: false}));
    } else {
        Order.find({status: {$ne: 'pending'}})
        .then(orders => res.json({ok: true, order: orders}))
        .catch(err => res.json({ok: false}));
    }
  });

// @route   POST api/admin/supplierOrders
// @desc    Get supplier orders
// @access  private
router.post('/supplierOrders', passport.authenticate( 'jwt', { session : false}), (req, res) => {
    if(req.body.check === "1"){
        Order.find({status: 'processing'})
        .then(orders => res.json({ok: true, order: orders}))
        .catch(err => res.json({ok: false}));
    } else {
        Order.find({status: 'Order Received'})
        .then(orders => res.json({ok: true, order: orders}))
        .catch(err => res.json({ok: false}));
    }
  });

// @route   Post api/admin/processOrder
// @desc    Update order status and create transaction_record
// @access  Private
router.post('/processOrder', passport.authenticate( 'jwt', { session : false}), (req, res) => {

  Order.findOne({_id: req.body.order_id})
      .then(order => {
          if(order){
              bill = req.body.amount;
              adminbill = (bill * 10)/100;
              bill = bill - adminbill;
              // create transaction record
              const newTransaction = new Transaction({
                  sender_accNo: req.user.bankAccNo,
                  receiver_accNo: '963852',
                  amount: bill,
                  status: 'pending'
              });
              newTransaction.save()
                .then(record => {
                    // Update order status & transaction_id
                    const orderField = {};
                    orderField.status = 'processing';
                    orderField.transaction_id = record._id;
                    Order.findOneAndUpdate({_id: req.body.order_id}, { $set: orderField }, { new: true })
                    .then(order => res.json(order));
                })
                .catch(err => console.log(err));
          }else{
              console.log('order not found')
          }
      });
});

// @route   Post api/admin/receiveOrder
// @desc    Receive order and validate transaction record and collect money :)
// @access  Private
router.post('/receiveOrder', passport.authenticate( 'jwt', { session : false}), (req, res) => {

    console.log(req.user.bankAccNo);

  Transaction.findOne({_id: req.body.transaction_id})
      .then(record => {
          if(record){

              if(record.status == 'pending' && record.receiver_accNo == req.user.bankAccNo){
                    // Deduct from admin account
                    BankAccount.findOne({accNo: record.sender_accNo})
                    .then(adminAcc => {
                        const accInfo = {};
                        accInfo.balance = ( adminAcc.balance - record.amount );
                        BankAccount.findOneAndUpdate({accNo: record.sender_accNo}, { $set: accInfo }, { new: true })
                        .then(acc => {
                            //console.log(acc);
                        });
                    });

                    // Move to supplier account

                    BankAccount.findOne({accNo: record.receiver_accNo})
                    .then(suppAcc => {
                        const suppInfo = {};
                        suppInfo.balance = ( suppAcc.balance + record.amount );
                        BankAccount.findOneAndUpdate({accNo: record.receiver_accNo}, { $set: suppInfo }, { new: true })
                        .then(acc => {
                        //console.log(acc);
                        });
                    });
                    // Close transaction 

                    const transacrionInfo = {};
                    transacrionInfo.status = 'received'

                    Transaction.findOneAndUpdate({_id: req.body.transaction_id}, { $set: transacrionInfo }, { new: true })
                    .then(acc => {
                        //console.log(acc);
                    });

                    // Notify User 
                    const orderField = {};
                    orderField.status = 'Order Received';
                    Order.findOneAndUpdate({_id: req.body.order_id}, { $set: orderField }, { new: true })
                    .then(order => res.json(order));

              } else{
                  console.log('ha ha');
              }
          }else{
              console.log('transaction record not found')
          }
      });
});

module.exports = router; 