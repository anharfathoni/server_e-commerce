var express = require('express');
var router = express.Router();
const {showItem,addItem,editItem,deleteItem,byCategory} = require('../controllers/itemController.js')
const {sendUploadToGCS,multer} = require('../middlewares/upload.js')
const {authentication,authorization} = require('../middlewares/auth.js')

router
      .get('/',showItem)
      .get('/:category',byCategory)
      .post('/', authentication, authorization, multer.single('file'), sendUploadToGCS, addItem)
      .put('/:id', authentication, authorization, multer.single('file'), sendUploadToGCS, editItem)
      .delete('/:id', authentication, authorization, deleteItem)

module.exports = router;
