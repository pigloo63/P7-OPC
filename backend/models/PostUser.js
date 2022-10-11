const mongoose = require('mongoose')

const postUser = mongoose.Schema({
	userId: { type: String, required: true },
	message: { type: String, required: true },
	imageUrl: { type: String },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('postUser', postUser)
