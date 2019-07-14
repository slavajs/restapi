const emailToken = require("../models/emailVerToken");

const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const User = require("../models/User");

const config = require("../config");

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key: config.MAIL
    }
  })
);

exports.createToken = (req, res, next) => {
  const email = req.body.email;
  const token = new emailToken({
    email: req.body.email
  });
  return token
    .save()
    .then(tok => {
      User.findOneAndUpdate({ email: tok.email })
        .then(user => {
          user.emailAuth.tokenId = tok._id.toString();
          return user.save();
        })
        .then(user => {
          transporter
            .sendMail({
              from: "slavajs@slava.com",
              to: user.email,
              subject: "Sign Up",
              html: `<h1>Thanks for registration</h1>
       <p> <a href = ${"http://localhost:80/auth/email/" +
         user.emailAuth.tokenId} > Please, confirm your email</a></p>`
            })
            .catch(err => next(err));
        })
        .then(mes => console.log(mes))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

exports.checkAuthEmail = (req, res, next) => {
  const tokenId = req.params.tokenId;
  emailToken
    .findOne({ _id: tokenId })
    .then(token => {
      if (!token) {
        throw new Error("Bad URI");
      }
      User.findOneAndUpdate({ "isAuthEmail.tokenId": token._id.toString() })
        .then(user => {
          if (user) {
            user.emailAuth.isAuth = true;
            user.emailAuth.tokenId = null;
          } else {
            throw new Error("User not found");
          }
          return user.save();
        })
        .then(user => {
          token
            .remove()
            .then(tok => {
              return res.status(200).json({
                mssage: "Email was verified",
                user: user
              });
            })
            .catch(err => next(err));
        });
    })
    .catch(err => next(err));
};
