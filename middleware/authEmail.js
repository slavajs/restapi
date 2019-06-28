const  User = require('../models/User');

const emailToken = require('../models/emailVerToken');

module.exports = (req, res, next) => {
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key:
      MAIL_API
    }
  })
);
}
