/* eslint-disable linebreak-style */
const express = require('express')
const router = express.Router()
const roles = require('../middlewares/roles')

const postCrtl = require('../controllers/post')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router.post('/:id/like', auth, postCrtl.likePost)

router.post('/', auth, multer, postCrtl.createPost)

router.put('/:id', auth, roles, multer, postCrtl.updatePost)

router.delete('/:id', auth, roles,  multer, postCrtl.deletePost)

router.get('/', auth, postCrtl.getAllPost)

router.get('/:id', auth, postCrtl.getOnePost)

module.exports = router
