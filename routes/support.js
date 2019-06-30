const express = require('express');

const supportController = require('../controllers/support');

const router = express.Router();
router.post('/support', supportController )

module.exports = router;