/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const userSocialNetwork = require('../models/UserSocialNetwork')
const jxt = require('jsonwebtoken')

exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new userSocialNetwork({
				email: req.body.email,
				password: hash,
			})
			user.save()
				.then(() =>
					res.status(201).json({ message: 'Utilisateur créé !' })
				)
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res) => {
	userSocialNetwork
		.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ message: 'Paire login/mot de passe incorrecte' })
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							message: 'Paire login/mot de passe incorrecte',
						})
					}
					res.status(200).json({
						userId: user._id,
						userAdmin: user.admin,
						token: jxt.sign(
							{ userId: user._id, userAdmin: user.admin },
							'RANDOM_TOKEN_SECRET',
							{
								expiresIn: '24h',
							}
						),
						message: 'utilisateur connecté',
					})
				})
				.catch((error) => res.status(500).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}
