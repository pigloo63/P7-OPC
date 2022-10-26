/* eslint-disable linebreak-style */
import React, { createContext, useState } from 'react'
import PropType from 'prop-types'

const defaultValue = {
	token: '',
	userId: null,
	userAdmin: false,
	userIsLoggedIn: false,
	login: () => {},
	logout: () => {}
}

const AuthContext = createContext(defaultValue)

//controle si les élements sont dans le localStorage
const tokenStorage = localStorage.getItem('token')
const userIdStorage = localStorage.getItem('userId')
//JSON.stringingify et .parse va permettre d'envoyer sous forme de booléen
const adminLocalStorage = JSON.parse(localStorage.getItem('userAdmin'))

export const AuthContextProvider = (props) => {

	const [token, setToken] = useState(tokenStorage)
	const [userId, setUserId] = useState(userIdStorage)
	const [userAdmin, setUserAdmin] = useState(adminLocalStorage)
	console.log(userAdmin)

	const loginHandler = (token, userId, userAdmin) => {
		setToken(token)
		setUserId(userId)
		setUserAdmin(userAdmin)
		localStorage.setItem('token', token)
		localStorage.setItem('userId', userId)
		localStorage.setItem('userAdmin', JSON.stringify(userAdmin))
	}

	const logoutHandler = () => {
		setToken(null)
		setUserId(null)
		setUserAdmin(0)
		localStorage.clear()
	}

	//convertie le token en valeur booléene
	const userIsLoggedIn = !!token

	const contextValue = {
		token: token,
		userId: userId,
		userAdmin: userAdmin,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	)

}

AuthContextProvider.propTypes = {
	children:PropType.node
}
	

export default AuthContext
