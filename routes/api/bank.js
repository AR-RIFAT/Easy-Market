const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Models
const BankAccount = require('../../models/BankAccount');
const Order = require('../../models/Order');

// @route   GET api/bank/test
// @desc    Tests bank route
// @access  Public

router.get('/test', (req, res) => res.json({
    msg:'Bank is working...'
}));

// @route   POST api/bank/createBankAc
// @desc    Create bank Account
// @access  Private
router.post('/createBankAc',passport.authenticate('jwt', { session: false }), (req, res) => {

    const newAcc = new BankAccount({
        accNo: req.body.bankInfo, 
        password: req.body.password,
        balance: 200000
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAcc.password, salt, (err, hash) => {
          if (err) throw err;
          newAcc.password = hash;
          newAcc.save()
            .then(user => {
                console.log('Success: Bank Acc created');
                res.json(user);
            })
            .catch(err => console.log(err));
        });
      });

});

// @route   POST api/bank/balance
// @desc    Check balance
// @access  Private
router.post('/balance',passport.authenticate('jwt', { session: false }), (req, res) => {

  BankAccount.findOne({accNo: req.body.bankInfo})
      .then(account => {
          //console.log(account);
          if(account){

            bcrypt.compare(req.body.password, account.password).then(isMatch => {
              if(isMatch){
                res.json({balance: account.balance})
              } else{
                res.json({balance: 'wPass'})
              }
            });
          }else{
            res.json({ok: 'wAcc'})
          }
      });

});

// @route   Post api/bank/requestOrder
// @desc    Get balance > check > create order
// @access  Private
router.post('/requestOrder', passport.authenticate( 'jwt', { session : false}), (req, res) => {

  BankAccount.findOne({accNo: req.body.bankInfo})
      .then(account => {
          //console.log(account);
          if(account){

            bcrypt.compare(req.body.password, account.password).then(isMatch => {
              if(isMatch){
                if(account.balance >= req.body.price){
            
                  const newOrder = new Order({
                    user_id: req.user._id, 
                    supplier_id: '2001',
                    details: req.body.details,
                    price: req.body.price,
                    status: 'pending'
                  });
                  newOrder.save()
                    .then(order => {
                      res.json({ok: 'true', order: order})
                    })
                    .catch(err => console.log(err));

                  // Deduct from user account
                  const accInfo = {};
                  accInfo.balance = ( account.balance - req.body.price );
                  BankAccount.findOneAndUpdate({accNo: req.body.bankInfo}, { $set: accInfo }, { new: true })
                  .then(acc => {
                    //console.log(acc);
                  });

                  // Move to admin account
                  console.log(req.body.admin);
                  BankAccount.findOne({accNo: req.body.admin})
                  .then(adminAcc => {
                    console.log(adminAcc.balance);
                    const suppInfo = {};
                    suppInfo.balance = ( adminAcc.balance + req.body.price );
                    BankAccount.findOneAndUpdate({accNo: req.body.admin}, { $set: suppInfo }, { new: true })
                    .then(acc => {
                      console.log(acc);
                    });
                  });
    
                } else{
                  res.json({ok: 'false'})
                }
              } else{
                res.json({ok: 'wPass'})
              }
            });
          }else{
            res.json({ok: 'wPass'})
          }
      });
});
  


module.exports = router; 