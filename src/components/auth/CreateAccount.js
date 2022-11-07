/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useContext } from 'react'
import Button from '../../UI/button'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/authContext'
import { useHistory } from 'react-router-dom'

const CreateAccount = () => {
	const emailInputRef = useRef()
	const pwdInputRef = useRef()

	const [data, setData] = useState()

	const history = useHistory()

	const authCtx = useContext(AuthContext)

	const signUpHandler = (e) => {
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

		const url = 'http://localhost:4000/api/auth/signup'
		const urlLogin = 'http://localhost:4000/api/auth/login'

		const fetchSignup = async () => {
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

				//const dataResult = await result.json()
				//console.log(dataResult)

				if (result.ok) {
					const result = await fetch(urlLogin, {
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
	
					if (result.ok) {
						setData(dataResult)
						authCtx.login(
							dataResult.token,
							dataResult.userId,
							dataResult.userAdmin
						)
						history.push('/reseaux')
					}
				}
				//history.push('/reseaux')
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}
		fetchSignup()
	}

	return (
		<div>
			<h1 className="authForm-title">Créer un compte</h1>
			<form onSubmit={signUpHandler} className="authForm">
				<label htmlFor="email">Votre email</label>
				<input
					className="input-field-auth"
					type="email"
					id="email"
					name="email"
					ref={emailInputRef}
					placeholder="exemple@exemple.com"
					required
				/>
				<label htmlFor="password">Mot de passe</label>
				<input
					className="input-field-auth"
					type="password"
					id="password"
					name="password"
					ref={pwdInputRef}
					required
					placeholder="exemple : pL54n7JHX!"
				/>
				<div>
					<p>Le mot de passe doit contenir au minimum : </p>
					<p>- 8 caractères</p>
					<p>- Au moins 1 majuscule</p>
					<p>- Au moins de 2 chiffres</p>
					<p>- Ne dois pas comporter d'espaces</p>
					<p>- Passw0rd et Password123 sont interdit</p>
				</div>
				<Button type={'submit'} className='btn-type-account'>Créer un compte</Button>
			</form>
			<Link to='/' className='linkToSignSignup'>Page de connexion </Link>
		</div>
	)
}

export default CreateAccount
