/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const rateLimit = require('express-rate-limit')

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

const dotenv = require('dotenv')
// eslint-disable-next-line no-unused-vars
const result = dotenv.config()

const helmet = require('helmet')

app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	)
	next()
})

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api/auth', apiLimiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/post', postRoutes)

module.exports = app
