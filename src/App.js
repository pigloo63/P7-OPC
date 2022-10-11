/* eslint-disable linebreak-style */
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './components/Error/Error'
import Header from './components/Header/Header'

import AuthContext from './Context/authContext'
import Home from './pages/Home'
import Post from './pages/Post'

function App() {
	const authCtx = useContext(AuthContext)

	// eslint-disable-next-line no-unused-vars
	const isLoggedIn = authCtx.isLoggedIn

	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
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
