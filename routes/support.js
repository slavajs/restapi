const express = require('express');
const sendgrid = require("nodemailer-sendgrid-transport");

const supportController = require('../controllers/support');

const router = express.Router();

router.post('/support', supportController);

module.exports = router;