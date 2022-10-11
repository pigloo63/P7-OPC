/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
import React, { useRef, useState, useContext } from 'react'
import Button from '../../UI/button'
import AuthContext from '../../Context/authContext'
import { useHistory } from 'react-router-dom'

const AuthForm = () => {
	const emailInputRef = useRef()
	const pwdInputRef = useRef()

	const history = useHistory()

	//utilisation du context
	const authCtx = useContext(AuthContext)

	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState()
	const [isloading, setIsLoading] = useState(false)
	const [islogin, setIsLogin] = useState(true)

	const toggleAuthHandler = () => {
		setIsLogin((prevState) => !prevState)
	}

	const submithandler = (e) => {
		e.preventDefault()

		const enteredEmail = emailInputRef.current.value
		const enteredPwd = pwdInputRef.current.value

		//Contrôle de la validité de l'email côté front
		//trim retire les espaces à au début et à la fin de la chaine de caractère
		if (
			enteredEmail.trim().length === 0 ||
            enteredPwd.trim().length === 0
		) {
			return
		}

		const regexEmail = (value) => {
			return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
		}

		if (!regexEmail(enteredEmail)) {
			return
		}

		setIsLoading(true)

		//Changement d'url si l'utilisateur veut se connecter ou s'inscrire
		let url
		if (islogin) {
			url = 'http://localhost:4000/api/auth/login'
		} else {
			url = 'http://localhost:4000/api/auth/signup'
		}
		//Récupération et validation des email et PWD dans le BDD
		const fetchlog = async () => {
			try {
				const result = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPwd,
					}),
					headers: {
						'Content-type': 'application/json',
					},
				})

				const dataResult = await result.json()

				//setisloading à false lorsque le serveur à répondu
				setIsLoading(false)

				if (result.ok) {
					setData(dataResult)
					authCtx.login(dataResult.token, dataResult.userId, dataResult.userAdmin)
					history.push('/reseaux')
				}
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}
		fetchlog()


		//vider les champs après la connection
		emailInputRef.current.value = ''
		pwdInputRef.current.value = ''
	}

	return (
		<>
			{islogin ? <h1>Se connecter</h1> : <h1>Créer un compte</h1>}
			<form onSubmit={submithandler}>
				<label htmlFor="email">Votre email</label>
				<input
					type="email"
					id="email"
					name="email"
					ref={emailInputRef}
					required
				/>
				<label htmlFor="password">Mot de passe</label>
				<input
					type="password"
					id="password"
					name="password"
					ref={pwdInputRef}
					required
				/>
				{!isloading && (
					<Button type={'submit'}>
						{islogin ? 'Se Connecter' : 'Créer un compte'}
					</Button>
				)}
				<p onClick={toggleAuthHandler}>
					{islogin ? 'Créer un compte' : 'Se connecter'}
				</p>
				{isloading && <p>En cours de chargement</p>}
			</form>
		</>
	)
}

export default AuthForm
