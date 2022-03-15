const jwt = require('jsonwebtoken');
const User = require('../models/User');

// check current user
//Authentication: Who you are.
//Authorization : Where can you acces.
const checkUser = (req, res, next) => {
  const token =req.get("Authorization");
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.locals.myStatus =400;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.myStatus =200;
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.myStatus =401;
    res.locals.user = null;
    next();
  }
};

module.exports = { checkUser };