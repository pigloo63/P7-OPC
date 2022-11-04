/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'
import '../../styles/likePost.css'

const LikePost = ({ id, like, onRefresh}) => {
	const authCtx = useContext(AuthContext)
	const [likeData, likeSetData] = useState([])
	const [likes, setLikes] = useState(0)
	const [userLikes, setUserLikes] = useState()
	const [numberLike, setNumberLike] = useState(0)

	function increment(){

		let like = likes

		if (like === 0) {
			setLikes(1)
			setNumberLike(numberLike + 1)
			setUserLikes(authCtx.userId)
		}

		if (like === 1) {
			setLikes(0)
			setNumberLike(numberLike - 1)
		}
	}

	const submitHandler =  (event) => {
		event.preventDefault()

		const url = `http://localhost:4000/api/post/${id}/like`
	
		const fetchLike = async () => {
			try {
				const likePost = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({
						like: likes,
						userId: userLikes,
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authCtx.token}`,
					},
				})
	
				const likePostResult = await likePost.json()
	
				if (likePost.ok) {
					likeSetData(likePostResult)
				}
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}

		fetchLike()
	
	}

	useEffect(() => {
		onRefresh()
	},[likeData])


	return (
		<div>
			<form onSubmit={submitHandler} className='like-style'>
				<Button type={'submit'} onClick={increment}>
                    J'aime
				</Button> :{' '} {like}
			</form>
		</div>
	)
}

export default LikePost
