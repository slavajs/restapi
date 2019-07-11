const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.JWT);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const email = decodedToken.email;
  User.findOne({ email: email })
    .then(user => {
      if (!user.emailAuth.isAuth) {
        throw new Error("You must verify your email");
      }
      next();
    })
    .catch(err => next(err));
};
