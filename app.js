require('dotenv').config()
const express = require('express')
const app = express()
var createError = require('http-errors');
var cors = require('cors')
const mongoose = require('mongoose');
const mongodbUri = 'mongodb://anharaf:anhar1234@ds227674.mlab.com:27674/shopping-cart'
const port = process.env.PORT || 3000

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: 'anharaf',
      password: 'anhar1234'
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});


//routes
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin.js')
var itemRouter = require('./routes/item.js')
var categoryRouter = require('./routes/category.js')
var cartRouter = require('./routes/cart.js')
var routes = require('./routes/index.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//path
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/item', itemRouter)
app.use('/category', categoryRouter)
app.use('/cart',cartRouter)
app.use('/', routes);

// app.listen(port, () => {
//     console.log(`Listening to port ${port}`);
// })


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(400).json({err});
});

module.exports = app;
