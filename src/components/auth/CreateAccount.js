/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useContext } from 'react'
import Button from '../../UI/button'
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

		const url = 'http://localhost:4000/api/auth/signup'

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

				const dataResult = await result.json()
				console.log(dataResult)

				//setisloading à false lorsque le serveur à répondu

				if (result.ok) {
					setData(dataResult)
				}
				history.push('/')
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
				<p>Le mot de passe doit contenir au minimum : </p>
				<p>- 8 caractères</p>
				<p>- Au moins 1 majuscule</p>
				<p>- Au moins de 2 chiffres</p>
				<p>- Ne dois pas comporter d'espaces</p>
				<p>- Passw0rd et Password123 sont interdit</p>

				<Button type={'submit'}>Créer un compte</Button>
			</form>
		</div>
	)
}

export default CreateAccount
