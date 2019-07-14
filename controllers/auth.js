const Post = require("../models/Post");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const config = require('../config');


exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        const error = new Error("User with given email already exists");
        error.statusCode = 401;
        throw error;
      }
      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            status: "user"
          });
          return user.save();
        })
        .then(user => {
            res.status(201).json({
            message: "successfully created a user",
            user: user
          });
           next()
        })
        .catch(err => next(err))
    })

    .catch(err => next(err));
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(doMatch => {
      if (!doMatch) {
        const err = new Error("Passwords have to match");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        {
          email: email,
          userId: loadedUser._id.toString()
        },
        config.JWT,
        {
          expiresIn: "5h"
        }
      );
      res.status(201).json({
        message: "successfully logged in",
        jwt: token
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
