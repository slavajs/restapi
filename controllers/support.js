const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const config = require("../config");

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

  transporter
    .sendMail({
      from: "slavajs@slava.com",
      to: "dimaidiothack@gmail.com",
      subject: "Support",
      html: `
        <h1> ${topic}</h1>
        <p> From: ${contactEmail}</p>
        <p>  Problem: ${text}</p>
        `
    })
    .then(result => {
      return res.status(200).json({
        message: "Successfully sent message to support"
      });
    })
    .catch(err => next(err));
};
