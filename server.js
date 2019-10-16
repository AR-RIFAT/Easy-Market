const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();
const port = process.env.PORT || 5000;

const customer = require('./routes/api/customer');
const bank = require('./routes/api/bank'); 
const admin = require('./routes/api/admin');

// bodyParcer middleware

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 120 * 60 * 1000 } // 3 houres
}));

// passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/api/customer', customer);
app.use('/api/bank', bank);
app.use('/api/admin', admin);

app.listen(port, () => console.log(`Running on ${port} ...`));