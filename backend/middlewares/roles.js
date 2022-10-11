/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken')
const postHelper = require('../Helper/postHelper')

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1]
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
	const userId = decodedToken.userId
	const userAdmin = decodedToken.userAdmin
	req.auth = {
		userId: userId,
		userAdmin: userAdmin,
	}
	const id = req.params.id
	postHelper
		.findPost(id)
		.then((post) => {
			if (post.userId === userId || userAdmin) {
				next()
			} else {
				res.status(401).json({ error: 'unauthorized request' })
			}
		})
		.catch(() => res.status(404).json({ error: 'object not found' }))
}
