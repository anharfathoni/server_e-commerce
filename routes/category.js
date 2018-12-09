var express = require('express');
var router = express.Router();
const {showCategories,addCategory,editCategory,deleteCategory} = require('../controllers/categoryController.js')
const {authentication,authorization} = require('../middlewares/auth.js')
router
      .get('/', showCategories)
      .post('/', authentication, authorization, addCategory)
      .put('/:id', authentication, authorization, editCategory)
      .delete('/:id', authentication, authorization, deleteCategory)

module.exports = router;
