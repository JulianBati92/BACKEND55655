const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');

userRouter.post('/register', authController.registerUser);

module.exports = userRouter;