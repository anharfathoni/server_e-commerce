const Item = require('../models/Items.js')

class itemController {
  static addItem(req, res) {
    let data = JSON.parse(req.body.data)

    let { name, price, stock, category, description } = data
    let link = req.file.cloudStoragePublicUrl

    let newItem = { name, price, stock, category, description, link }
    // console.log(newItem)
    Item.create(newItem)
      .then(item => {
        // console.log(item)
        res.status(200).json(item)
      })
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      })
  }

  static showItem(req, res) {
    console.log("masuk show items")
    Item.find().populate({ path: 'category', select: 'name' })
      .then(items => {
        let dataItem = []
        items.forEach(e => {
          dataItem.push({ _id: e._id, name: e.name, price: e.price, stock: e.stock, category: e.category.name, description: e.description, link: e.link })
        });
        res.status(200).send(dataItem)
      })
      .catch(error => {
        console.log(error)
        res.status(400).json(error)
      })
  }

  static editItem(req, res) {
    let id = req.params.id
    let { name, price, stock, category, description } = JSON.parse(req.body.data)
    let link = req.file.cloudStoragePublicUrl
    let editItem = { name, price, stock, category, description, link }

    Item.findByIdAndUpdate({ _id: id }, editItem)
      .then(item => {
        res.status(200).json({ item })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
  }

  static deleteItem(req, res) {
    let id = req.params.id
    Item.findByIdAndDelete({ _id: id })
      .then(item => {
        res.status(200).json({ item })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
  }

  static byCategory(req, res) {
    Item.find({ category: req.params.category })
      .then(items => {
        console.log(items)
        res.status(200).json(items)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  }
}

module.exports = itemController