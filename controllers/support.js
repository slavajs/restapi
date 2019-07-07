const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key: config.MAIL
    }
  })
);

module.exports = (req, res, next) => {
  const contactEmail = req.body.contactEmail;
  const topic = req.body.topic;
  const text = req.body.text;

  return transporter.sendMail({
    from: "mysite@mail.ru",
    to: "support@slavajs.com",
    subject: "Support",
    html: `
   <h1> ${topic}</h1>
   <p> From: ${conctactEmail}</p>
   <p>  Problem: ${text}</p>
   `
  });
};
