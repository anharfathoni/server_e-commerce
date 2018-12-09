const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping-cart');

const User = require('./models/Users.js')

let admin = {
  name: "Anhar",
  email: "anhar@mail.com",
  password: "1234",
  role: "admin"
}
console.log('coba create')
User.create(admin, function(err,user){
  // if(err) res.status(400).json({err})
  // else res.status(200).json({user})
  if(err) console.log(err)
  else console.log("===",user)
})