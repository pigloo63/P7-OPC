/* eslint-disable linebreak-style */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './components/Error/Error'
import Header from './components/Header/Header'

import Home from './pages/Home'
import Post from './pages/Post'

function App() {
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
