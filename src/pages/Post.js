/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useCallback, useEffect } from 'react'
import AuthContext from '../Context/authContext'
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

	const url = 'http://localhost:4000/api/post/'

	const fetchHandler = useCallback(async () => {
		try {
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
	}, [data])

	useEffect(() => {
		fetchHandler()
		console.log(data[1])
	}, [])

	const onRefresh = () => {
		fetchHandler()
	}

	return (
		<div>
			{isLoggedIn && (
				<div className="main">
					{isLoggedIn && (
						<h1 className="title">LE RESEAU GROUPOMANIA</h1>
					)}
					<section className="container">
						{isLoggedIn && (
							<PostForm onRefresh={onRefresh} data={data} />
						)}
						<div>
							<div className="reverse">
								{data.map((post) => (
									<div
										key={post._id}
										className="container-post"
									>
										<p>{post.message}</p>
										{post.imageUrl && (
											<img
												src={post.imageUrl}
												alt="image utilisateur"
												height={'200px'}
												className="image-style"
											/>
										)}
										{
											<div className="component-style">
												<LikePost
													className="displayComponent"
													id={post._id}
													userId={post.userId}
													like={post.likes}
													onRefresh={onRefresh}
												/>
												{(isAdmin === true ||
                                                    isAdmin === 'true' ||
                                                    userId === post.userId) && (
													<ModifyPost
														id={post._id}
														userId={post.userId}
														data={data}
														imageUrl={post.imageUrl}
														message={post.message}
														onRefresh={onRefresh}
													/>
												)}
												{(userId === post.userId ||
                                                    isAdmin) && (
													<DelePost
														className="displayComponent"
														userId={post.userId}
														id={post._id}
														data={data}
														onRefresh={onRefresh}
													/>
												)}
											</div>
										}
									</div>
								))}
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	)
}

export default Post
