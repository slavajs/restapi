const express = require("express");

const User = require("../models/User");
const authController = require("../controllers/auth");
const {check, body} = require('express-validator/check')

const router = express.Router();

router.post("/login", authController.postLogin);

router.post('/signup', authController.postSignup);

module.exports = router;
