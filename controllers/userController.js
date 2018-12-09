const User = require('../models/Users.js')
const {checkPassword} = require('../helpers/helper.js')
const jwt = require('jsonwebtoken')

class userController{
  static login(req,res){
    let {email,password} = req.body
    User.find({email}, function(err,user){
        if(err){
            res.status(400).json({err})
        } else {
            if(user.length > 0){
                if(checkPassword(password,user[0].password)){
                    //success login
                    let token = jwt.sign({ email }, process.env.SECRET);
                    res.status(200).json({user: user[0],token})
                } else {
                    res.status(400).json({error: "wrong password"})
                }
            } else {
                // user not found
                res.status(400).json({error: "user not found"})
            }
          }
    })
  }

  static register(req,res){
    console.log('========')
    // console.log(req.body)
    let {name,email,role,password,cart} = req.body
    let newUser = {name,email,role,password,cart}
    // console.log(newUser)
    User.create(newUser)
    .then(user => {
        console.log('success register')
        res.status(200).json({user,message:"success create account"})
    })
    .catch( error => {
        console.log(typeof error)
        console.log(Object.keys(error))
        console.log(Object.keys(error.errors))
        // console.log(error)
        // console.log(error._message)
        console.log(typeof(error.message))
        res.status(400).send({error: error.message})
    })

  }

  static logout(){

  }
}

module.exports = userController