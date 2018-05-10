const express = require("express");
const router = express.Router();
const User = require("./user.model");
const authController = require('./auth.controller');

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;