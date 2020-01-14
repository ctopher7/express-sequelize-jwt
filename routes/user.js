const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const joi = require('../joi/user')
const utils = require('../utils/user')

router.post('/signUp',joi.signUp,utils.signUpValidator,controller.signUp);
router.post('/signIn',joi.signIn,controller.signIn)

module.exports = {router,routePath:'/user'};
