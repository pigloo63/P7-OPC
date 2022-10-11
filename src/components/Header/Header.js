/* eslint-disable linebreak-style */
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/authContext'


const Header = () => {

	const authCtx = useContext(AuthContext)

	const isLoggedIn = authCtx.isLoggedIn
	
	return (
		<header>
			<nav>
				<ul>
					{isLoggedIn && <Link to="/reseaux">
						<li>Réseaux</li>
					</Link>}
					{isLoggedIn && <li onClick={authCtx.logout}>Se déconnecter</li>}
				</ul>
			</nav>
		</header>
	)
}

export default Header
