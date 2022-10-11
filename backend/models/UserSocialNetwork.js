const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSocialNetworkSchema = mongoose.Schema({
	email: { type: String, required: [true, 'email est requis'], unique: true },
	password: { type: String, required: [true, 'password est requis'] },
	admin: { type: Boolean, default: 0 },
})

userSocialNetworkSchema.plugin(uniqueValidator)

module.exports = mongoose.model('UserSocialNetwork', userSocialNetworkSchema)
