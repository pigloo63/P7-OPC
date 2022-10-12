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
			<img src='./img/icon-left-font.png' alt='logo-grouponania' className='logo'/>
			<nav>
				<ul className='container-header'>
					{isLoggedIn && <Link to="/reseaux">
						<li className='header-list'>Réseaux</li>
					</Link>}
					{isLoggedIn && <li className='header-list' onClick={authCtx.logout}>Se déconnecter</li>}
				</ul>
			</nav>
		</header>
	)
}

export default Header
