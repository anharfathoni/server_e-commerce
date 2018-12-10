const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/shopping-cart');
const mongodbUri = 'mongodb://anharaf:anhar1234@ds227674.mlab.com:27674/shopping-cart'

console.log(mongodbUri)
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: 'anharaf',
      password: 'anhar1234'
    }
  });

const User = require('./models/Users.js')

let admin = {
  name: "User1",
  email: "user1@mail.com",
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