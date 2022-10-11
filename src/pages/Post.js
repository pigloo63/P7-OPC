/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useCallback } from 'react'
import AuthContext from '../Context/authContext'
import { useHistory } from 'react-router-dom'
import PostForm from '../components/Post/PostForm'
import DelePost from '../components/Post/DeletePost'
import ModifyPost from '../components/Post/ModifyPost'
import LikePost from '../components/Post/likePost'
import '../styles/post.css'

const Post = () => {
	const authCtx = useContext(AuthContext)
	const [data, setData] = useState([])

	const isLoggedIn = authCtx.isLoggedIn
	const isAdmin = authCtx.userAdmin
	const userId = authCtx.userId

	const history = useHistory()

	const url = 'http://localhost:4000/api/post/'

	const fetchHandler = useCallback(async () => {
		try {
			//console.log('je suis dans le try get')
			const result = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${authCtx.token}`,
				},
			})
			const Result = await result.json()
			setData(Result)
		} catch (error) {
			console.log('Pas de réponse de l\'API')
		}
	}, [])

	function historyHandler() {
		history.push('/')
	}

	const onRefresh = () => {
		fetchHandler()
	}

	return (
		<div>
			{isLoggedIn && (
				<section>
					{isLoggedIn && <h1>LE RESEAU GROUPOMANIA</h1>}
					{isLoggedIn && (
						<PostForm onRefresh={onRefresh} data={data} />
					)}
					<div>
						<div>
							{data.map((post) => (
								<div key={post._id}>
									<p>{post.message}</p>

									<img
										src={post.imageUrl}
										alt="image utilisateur"
										height={'200px'}
									/>
									<LikePost
										id={post._id}
										userId={post.userId}
										like={post.likes}
										onRefresh={onRefresh}
									/>
									{(userId === post.userId || isAdmin) && (
										<ModifyPost
											id={post._id}
											data={data}
											onRefresh={onRefresh}
										/>
									)}
									{(userId === post.userId || isAdmin) && (
										<DelePost
											id={post._id}
											data={data}
											onRefresh={onRefresh}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</section>
			)}
			{!isLoggedIn && <p>Vous êtes déconnecté</p>}
			{!isLoggedIn && (
				<p onClick={() => historyHandler()}>
                    Retourné à la page de conexion
				</p>
			)}
		</div>
	)
}

export default Post
