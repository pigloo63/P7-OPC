/* eslint-disable linebreak-style */
const postUser = require('../models/PostUser')
const fs = require('fs')
const postHelper = require('../Helper/postHelper')

exports.createPost = (req, res) => {
	const postStringify = JSON.stringify(req.body)
	const postObject = JSON.parse(postStringify)

	delete postObject._id
	delete postObject._userId
	const imageUrl = req.file
		? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		: null

	const post = new postUser({
		...postObject,
		userId: req.auth.userId,
		imageUrl,
	})

	postHelper
		.createPost(post)
		.then(() => {
			res.status(201).json({ message: 'post enregistré !' })
		})
		.catch(() => {
			res.status(500).json({ error: 'post non créé' })
		})
}

exports.updatePost = (req, res) => {
	const id = req.params.id
	postHelper
		.findPost(id)
		.then((post) => {
			if (req.file) {
				const filename = post.imageUrl.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}
			const postObject = req.file
				? {
					...req.body,
					imageUrl: `${req.protocol}://${req.get('host')}/images/${
						req.file.filename
					}`,
				}
				: { ...req.body }
			postHelper
				.updatePost(id, postObject)

				.then(() => {
					res.status(201).json({ message: 'post modifié' })
				})
				.catch((error) => res.status(404).json({ error }))
		})
		.catch(() => {
			res.status(500).json({ error: 'le post ne se met pas à jour' })
		})
}

exports.deletePost = (req, res) => {
	const id = req.params.id
	postHelper
		.findPost(id)
		.then((post) => {
			const id = req.params.id
			if (post.imageUrl) {
				const filename = post.imageUrl.split('/images')[1]
				postHelper
					.deletePost(id)
					.then(() => {
						fs.unlinkSync(`images/${filename}`)
						res.status(200).json({
							message: 'post et image supprimé',
						})
					})
					.catch(() =>
						res.status(404).json({
							error: 'le post et l\'image ne se supprime pas',
						})
					)
			} else {
				postHelper
					.deletePost(id)
					.then(() =>
						res.status(200).json({ message: 'post supprimée' })
					)
					.catch(() =>
						res
							.status(500)
							.json({ error: 'le post ne se supprime pas' })
					)
			}
		})
		.catch(() =>
			res
				.status(500)
				.json({ error: 'ne parvient pas à trouver l élément' })
		)
}

exports.likePost = (req, res) => {
	const id = req.params.id
	postHelper
		.findPost(id)
		.then((post) => {
			const userId = req.body.userId
			const likeArray = {
				likes: [1, -1],
				dislikes: [1, -1],
			}
			const id = req.params.id
			const usersliked = post.usersLiked
			const usersDisliked = post.usersDisliked
			const like = req.body.like

			if (like === 1) {
				postHelper
					.likePostUpdate(id, userId, likeArray, usersliked)
					.then(() => res.status(201).json({ message: 'like 1' }))
					.catch((error) => {
						res.status(400).json({ error })
					})
			}
			if (like === 0 && usersliked.includes(userId)) {
				postHelper
					.likePostUpdate(id, userId, likeArray, usersliked)
					.then(() => res.status(201).json({ message: 'like -1' }))
					.catch((error) => {
						res.status(400).json({ error })
					})
			}
			if (like === -1) {
				postHelper
					.dislikePostUpdate(id, userId, likeArray, usersDisliked)
					.then(() => res.status(201).json({ message: 'dislike +1' }))
					.catch((error) => {
						res.status(400).json({ error })
					})
			}
			if (like === 0 && usersDisliked.includes(userId)) {
				postHelper
					.dislikePostUpdate(id, userId, likeArray, usersDisliked)
					.then(() => res.status(201).json({ message: 'dislike -1' }))
					.catch((error) => {
						res.status(400).json({ error })
					})
			}
		})
		.catch((error) => {
			res.status(404).json({ error })
		})
}

exports.getOnePost = (req, res) => {
	const id = req.params.id
	postHelper
		.findPost(id)
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }))
}

exports.getAllPost = (req, res) => {
	postHelper
		.findAllPost()
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }))
}
