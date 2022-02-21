const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("test");
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400);
        next();
      } else {
        console.log(decodedToken);
        res.status(200);
        next();
      }
    });
  } else {
    res.status(401);
    next();
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("hello");
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