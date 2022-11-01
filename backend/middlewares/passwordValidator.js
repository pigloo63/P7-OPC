/* eslint-disable linebreak-style */
const passwordValidator = require('password-validator')

const newPassword = new passwordValidator()

//schéma que le mot de passe doit respecter
newPassword
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(100) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits(2) // Must have at least 2 digits
	.has()
	.not()
	.spaces() // Should not have spaces
	.is()
	.not()
	.oneOf(['Passw0rd', 'Password123']) // Blacklist these values

module.exports = (req, res, next) => {
	if (newPassword.validate(req.body.password)) {
		next()
	} else {
		res.status(400).json({
			error: `Le mot de passe n'est pas assez fort ${newPassword.validate(
				'joke',
				{ list: true }
			)}`,
		})
	}
}
