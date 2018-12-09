var express = require('express');
var router = express.Router();
const {showCart,addCart,deleteCart,checkout} = require('../controllers/cartController.js')
const {authentication,authorization} = require('../middlewares/auth.js')

router
      .get('/', authentication, showCart)
      .post('/', authentication, addCart)
      .put('/checkout',authentication, checkout)
      .put('/', authentication, deleteCart)

module.exports = router;