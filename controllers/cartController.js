const Item = require('../models/Items.js')
const User = require('../models/Users.js')

class cartController {
  static addCart(req, res) {
    console.log("======")
    console.log(req.body)
    let customerId = req.current_token._id
    let itemId = req.body.itemId
    console.log([customerId, itemId])
    return User.findByIdAndUpdate({ _id: customerId }, { $push: { cart: itemId } })
      .populate('cart')
      .exec((error, cart) => {
        console.log({
          error, cart
        })
        if (error) {
          console.log(err)
          res.status(400).json(error)
        } else {
          console.log(' ADD CARTTTTT')
          console.log(cart.cart)
          console.log(cart.cart.length)
          res.status(200).json(cart)
        }
      })
  }

  static deleteCart(req, res) {
    console.log([req.current_token._id, req.body.itemId])
    User.findByIdAndUpdate({ _id: req.current_token._id }, { $pull: { cart: req.body.itemId } })
      .populate('cart')
      .then(cart => {
        console.log(cart)
        console.log(cart.cart.length)
        res.status(200).json(cart)
      })
      .catch(error => {
        console.log(error)
        es.status(400).json(error)
      })
  }

  static showCart(req, res) {
    console.log('enteer')
    console.log(req.current_token._id)
    User.findById({ _id: req.current_token._id })
      .populate('cart')
      .then(user => {
        console.log('====CAAART=====')
        console.log(user.cart)
        console.log(user.cart.length)
        res.status(200).json(user.cart)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  }

  static checkout(req, res) {
    User.findByIdAndUpdate({ _id: req.current_token._id }, { cart: [] })
      .then(cart => {
        console.log(cart)
        console.log(cart.cart.length)
        res.status(200).json(cart)
      })
      .catch(error => {
        console.log(error)
        es.status(400).json(error)
      })
  }
}

module.exports = cartController