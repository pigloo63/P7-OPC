/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
import React, { useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../UI/button'
import AuthContext from '../../Context/authContext'
import { useHistory } from 'react-router-dom'
import '../../styles/authForm.css'

const AuthForm = () => {
	const emailInputRef = useRef()
	const pwdInputRef = useRef()

	const history = useHistory()

	//utilisation du context
	const authCtx = useContext(AuthContext)

	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState()

	const submithandler = (e) => {
		e.preventDefault()

		const enteredEmail = emailInputRef.current.value
		const enteredPwd = pwdInputRef.current.value


		//Changement d'url si l'utilisateur veut se connecter ou s'inscrire
		let url = 'http://localhost:4000/api/auth/login'
	
		
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
				console.log(dataResult)

				if (result.ok) {
					setData(dataResult)
					authCtx.login(
						dataResult.token,
						dataResult.userId,
						dataResult.userAdmin
					)
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
			<h1 className="authForm-title">Se connecter</h1>
			<form onSubmit={submithandler} className="authForm">
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
				
				<Button type={'submit'} className='btn-type-account'>
					Se Connecter
				</Button>
				<Link to='/createAccount' className='createAcount'>Créer un compte</Link>
			</form>
		</>
	)
}

export default AuthForm
