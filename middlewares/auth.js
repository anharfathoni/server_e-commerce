const jwt = require('jsonwebtoken')
const User = require('../models/Users.js')

function authentication(req,res,next){
    console.log('masuk authentication')
    let token = req.headers.authorization
    console.log(token)
    jwt.verify(token,process.env.SECRET, function(err, decoded){
      console.log(err)
      if(err){
        res.status(400).send({error: 'user not found, please login'})
      } else {
        User.findOne({
          email: decoded.email
        })
        .then(user => {
          console.log(user)
          req.current_token = user
          next() 
        })
        .catch( error =>{
          console.log(error)
          res.status(400).send({error: 'user not found, please login'})
        })
      }
    })
}

function authorization(req,res,next){
  console.log('masuk authorization')
  if(req.current_token.role === "admin")next()
  else res.status(400).json({error: "bukan admin"})
}

module.exports = {
  authentication,
  authorization
}