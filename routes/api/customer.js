const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const Cart = require('../../models/cart');

// Load Input Validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');
// Load Product model
const Product = require('../../models/Product');
// Load Product model
const Order = require('../../models/Order');

// @route   GET api/customer/test
// @desc    Tests customer route
// @access  Public

router.get('/test', (req, res) => res.json({
    msg:'Customer is working...'
}));

// @route   POST api/customer/register
// @desc    Register user
// @access  Public

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    bankAccNo: null
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route   GET api/customer/login
// @desc    LogIn user & Returning JWT Token
// @access  Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);
    // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Find User by email
    User.findOne({ email})
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not Found';
                return res.status(400).json(errors);
            }
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {

                        // User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            type: user.type,
                            email: user.email,
                            bankAccNo: user.bankAccNo
                        }
                        // Sign Token
                        jwt.sign(payload, keys.secretorKey, { expiresIn: 3600}, (err, token) => {
                            res.json({
                                success : true,
                                token : 'Bearer '+ token
                            });
                        });
                    } else {
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                    }
                });
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles 2'}));
});

// @route   GET api/customer/add-to-cart/:id
// @desc    add to Cart
// @access  Public
router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    Product.findById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        
        res.json({cart: cart})
    });
});

// @route   GET api/customer/totalCartItem
// @desc    sends total cart item
// @access  Public

router.get('/totalCartItem', (req, res) => {
    if(req.session.cart) {
        //console.log('total item : '+req.session.cart.totalQty);
        res.json({ total: req.session.cart.totalQty });
    }else{
        res.json({ total: 0 });
    }

});

// @route   GET api/customer/clearCart
// @desc    sends total cart item
// @access  Public

router.get('/clearCart', (req, res) => {

    delete req.session.cart;

    res.json({ cart: '' });

});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.json({products: null,totalPrice: 0 });
    }
    var cart = new Cart(req.session.cart.items);
    //console.log(cart.generateArray());
    res.json({products: cart.generateArray(), totalPrice: cart.totalPrice});
    // res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

// @route   Post api/customer/updateUser
// @desc    Update user bank account no
// @access  Private
router.post('/updateUser', passport.authenticate( 'jwt', { session : false}), (req, res) => {

    // Get Field
    const userField = {};

    console.log(req.body.bankInfo);
    console.log(req.user.email);
    userField.bankAccNo = req.body.bankInfo;

    User.findOne({email: req.user.email})
        .then(user => {
            //console.log(user);
            if(user){
                // Update
                User.findOneAndUpdate({email: req.user.email}, { $set: userField }, { new: true })
                    .then(user => res.json(user));
            }else{
                console.log('User not found')
            }
        });
});

// @route   GET customer/myorders
// @desc    Get orders
// @access  private
router.get('/myorders', passport.authenticate( 'jwt', { session : false}), (req, res) => {
    Order.find({user_id: req.user._id})
      .then(orders => res.json({ok: true, order: orders}))
      .catch(err => res.json({ok: false}));
  });

module.exports = router; 