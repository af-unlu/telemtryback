const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  if(res.locals.user===null){
    
    res.status(200).json({ "page":"SignUp Page" });
  }else{
    res.status(200).json({"message":"You are already logged in","usermail":res.locals.user.email});
  }
  
}

module.exports.login_get = (req, res) => {
  if(res.locals.user===null){
    res.status(200).json({ "page":"LogIn Page" });
  }else{
    res.status(200).json({"message":"You are already logged in","usermail":res.locals.user.email});
  }
}

module.exports.signup_post = async (req, res) => {
  const {name,surname,email,password} = req.body;
  try {
    const user = await User.create({name,surname,email,password});
    const token = createToken(user._id);

    res.status(201).json({ user: user._id ,AuthToken:token});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  if(res.locals.user===null){
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      
      res.status(201).json({ user: user._id ,AuthToken:token});

    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }else{
    res.status(200).json({"message":"You are already logged in","usermail":res.locals.user.email});
  }

}

module.exports.logout_get = (req, res) => {

  if(res.locals.user===null){
    res.status(200).json({ "message":"You are not even logged in" });
  }else{
    res.headers("AuthToken",'',{ maxAge: 1 });
    res.status(200).json({ "message":"Logget Out" });
  }
}