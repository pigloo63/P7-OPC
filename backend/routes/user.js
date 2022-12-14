/* eslint-disable linebreak-style */
const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const passwordValidator = require('../middlewares/passwordValidator')

router.post('/signup', passwordValidator, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
