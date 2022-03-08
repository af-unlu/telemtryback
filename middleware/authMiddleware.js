const jwt = require('jsonwebtoken');
const User = require('../models/User');
//belki ileride bu fonksiyonları değiştiririm
//ard arda çağırdığında boşu boşuna iki defa jwt decode ediliyor
const requireAuth = (req, res, next) => {
  const {token} =req.body;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.locals.myStatus =400;
        next();
      } else {
        res.locals.myStatus =200;
        next();
      }
    });
  } else {
    res.locals.myStatus =401;
    next();
  }
};

// check current user
const checkUser = (req, res, next) => {
  const {token} =req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };