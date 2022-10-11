/* eslint-disable linebreak-style */
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/authContext'
import '../../styles/header.css'


const Header = () => {

	const authCtx = useContext(AuthContext)

	const isLoggedIn = authCtx.isLoggedIn
	
	return (
		<header>
			<nav>
				<ul className='container'>
					{isLoggedIn && <Link to="/reseaux">
						<li>Réseaux</li>
					</Link>}
					{isLoggedIn && <li className='click' onClick={authCtx.logout}>Se déconnecter</li>}
				</ul>
			</nav>
		</header>
	)
}

export default Header
