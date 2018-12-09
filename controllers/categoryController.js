const Category = require('../models/Categories.js')
const Item = require('../models/Items.js')

class categoryController{
  static addCategory(req,res){
    console.log(req.body)
    Category.create({name: req.body.name})
    .then(item => {
      res.status(200).json({item})
    })
    .catch( error => {
      res.status(400).json({error})
    })
  }

  static showCategories(req,res){
    console.log("masuk show categories")
    Category.find({})
    .then(categories => {
      console.log(categories)
      res.status(200).json(categories)
    })
    .catch( error => {
      console.log(error)
      res.status(400).json(error)
    })
  }

  static editCategory(req,res){
    let id = req.params.id
    let newCategory = req.body
    Category.findByIdAndUpdate({_id:id}, newCategory)
    .then(category => {
      res.status(200).json({category})
    })
    .catch( error => {
      res.status(400).json({error})
    })
  }

  static deleteCategory(req,res){
    let id = req.params.id
    Category.findByIdAndDelete({_id:id})
    .then(category => {
      return Item.find({category: id})
    })
    .then( item => {
      if(item.length > 0){
        let {name, price, stock, description,link } = item[0]
        let category = '5c0cd154c45bae4f26715df7'
        let editItem = {name, price, stock, description,link,category}
        return Item.findByIdAndUpdate({_id:item[0]._id}, editItem)
      } else {
        res.status(200).json({message: 'success delete category'})
      }
    })
    .then( newUser => {
      console.log(newUser)
      res.status(200).json({newUser})
    })
    .catch( error => {
      res.status(400).json({error})
    })
  }
}

module.exports = categoryController