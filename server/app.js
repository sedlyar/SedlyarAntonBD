const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");

const carRouter = require('./routes/car');
const colorRouter = require('./routes/color');
const car_brandRouter = require('./routes/car_brand');
const customersRouter = require('./routes/customers');
const driverRouter = require('./routes/driver');
const dispatcherRouter = require('./routes/dispatcher');
const motionRouter = require('./routes/motion');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

let localStrategy = require("./auth/local-strategy");
let jwtStrategy = require("./auth/jwt-strategy");
passport.use(localStrategy());
passport.use(jwtStrategy());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/car', carRouter);
app.use('/api/color', colorRouter);
app.use('/api/car_brand', car_brandRouter);
app.use('/api/customers', customersRouter);
app.use('/api/driver', driverRouter);
app.use('/api/dispatcher', dispatcherRouter);
app.use('/api/motion', motionRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


module.exports = app;
