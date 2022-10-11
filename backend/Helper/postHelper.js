/* eslint-disable linebreak-style */
const Post = require('../models/PostUser')

const postHelper = {
	createPost(post) {
		return new Post(post).save()
	},
	deletePost(id) {
		return Post.deleteOne({ _id: id })
	},
	findPost(id) {
		return Post.findOne({ _id: id })
	},
	findAllPost() {
		return Post.find()
	},
	updatePost(id, postObject) {
		return Post.updateOne({ _id: id }, { ...postObject })
	},

	likePostUpdate(id, userId, likeArray, usersLiked) {
		if (!usersLiked.includes(userId)) {
			return Post.updateOne(
				{ _id: id },
				{
					$inc: { likes: likeArray.likes[0] },
					$push: { usersLiked: userId },
				}
			)
		} else {
			return Post.updateOne(
				{ _id: id },
				{
					$inc: { likes: likeArray.likes[1] },
					$pull: { usersLiked: userId },
				}
			)
		}
	},
	dislikePostUpdate(id, userId, likeArray, usersDisliked) {
		if (!usersDisliked.includes(userId)) {
			return Post.updateOne(
				{ _id: id },
				{
					$inc: { dislikes: likeArray.dislikes[0] },
					$push: { usersDisliked: userId },
				}
			)
		} else {
			return Post.updateOne(
				{ _id: id },
				{
					$inc: { dislikes: likeArray.dislikes[1] },
					$pull: { usersDisliked: userId },
				}
			)
		}
	},
}

module.exports = postHelper
