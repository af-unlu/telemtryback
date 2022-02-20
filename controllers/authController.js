const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// handle errors
//to respond with custom error objects, its usefull
//understand this structure
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

//jwt token
const maxAge = 3*24*60*60;

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_KEY,{
    expiresIn:maxAge
  })
};

// controller actions
module.exports.signup_get = (req, res) => {
    //res.render('signup');
}

module.exports.login_get = (req, res) => {
    //res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email,password} = req.body;

    try {
        //btw never never ever store raw passwords to DBs
        //at models at user model there is hashing inside pre function
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});
        //respond with OK
        res.status(201).json({user:user._id});
    } 
    catch (error) {
        //respond with error
        const errors = handleErrors(error);
        res.status(400).send({errors}); 

    }
}

module.exports.login_post = async (req, res) => {
    const {email,password} = req.body;
    console.log(email,password);
    
    res.send('user login');
}