var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
const cors =require ('cors')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping-cart');
require('dotenv').config()
// mongoose.connect('mongodb://localhost/todo');

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin.js')
var itemRouter = require('./routes/item.js')
var categoryRouter = require('./routes/category.js')
var cartRouter = require('./routes/cart.js')
const routes = require('./routes/index.js')

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/item', itemRouter)
app.use('/category', categoryRouter)
app.use('/cart',cartRouter)
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(400).json({error: err});
});

module.exports = app;
