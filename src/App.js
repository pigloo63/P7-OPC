/* eslint-disable linebreak-style */
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CreateAccount from './components/auth/CreateAccount'
import Error from './components/Error/Error'
import Header from './components/Header/Header'
import AuthContext from './Context/authContext'

import Home from './pages/Home'
import Post from './pages/Post'

function App() {

	const authCtx = useContext(AuthContext)

	const isLoggedIn = authCtx.isLoggedIn

	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						{isLoggedIn ? <Redirect to='/reseaux'/> : <Home/>}
					</Route>
					<Route path='/createAccount'>
						<CreateAccount/>
					</Route>
					<Route path="/reseaux">
						<Post />
					</Route>
					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</Router>
		</>
	)
}
export default App
