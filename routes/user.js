const express = require('express');
const router = express.Router();
const cont = require('../controllers/user')
const joi = require('../joi/user')
const validator = require('../validator/user')

router.post('/signUp',joi.signUp,validator.signUp,cont.signUp);
router.post('/signIn',joi.signIn,cont.signIn)

module.exports = {router,routePath:'/user'};
