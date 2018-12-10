const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/shopping-cart');
const mongodbUri = 'mongodb://anharaf:anhar1234@ds227674.mlab.com:27674/shopping-cart'

console.log(mongodbUri)
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });

const User = require('./models/Users.js')

let admin = {
  name: "Anhar",
  email: "anhar@mail.com",
  password: "123456",
  role: "admin"
}
console.log('coba create')
User.create(admin, function(err,user){
  // if(err) res.status(400).json({err})
  // else res.status(200).json({user})
  if(err) console.log(err)
  else console.log("===",user)
})