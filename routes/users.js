var express = require('express');
var router = express.Router();
const {login,logout,register} = require('../controllers/userController.js')

router
      .post('/',login)
      .post('/register',register)

module.exports = router;
