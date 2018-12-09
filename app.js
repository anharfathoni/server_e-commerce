const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const mongodbUri = process.env.mongo
const cors = require('cors')

//routes
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin.js')
var itemRouter = require('./routes/item.js')
var categoryRouter = require('./routes/category.js')
var cartRouter = require('./routes/cart.js')
var routes = require('./routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//path
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/item', itemRouter)
app.use('/category', categoryRouter)
app.use('/cart',cartRouter)
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

module.exports = app;
