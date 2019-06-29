const express = require("express");

const User = require("../models/User");
const authController = require("../controllers/auth");
const {check, body} = require('express-validator/check')

const emailAuth = require('../controllers/emailAuth');

const router = express.Router();

router.post("/login", authController.postLogin);

router.post('/signup',  authController.postSignup, emailAuth.createToken);

router.get('/email/:tokenId', emailAuth.checkAuthEmail)

module.exports = router;
