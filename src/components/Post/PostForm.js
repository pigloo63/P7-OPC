/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext, useEffect, useLayoutEffect} from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'


const PostForm = ({ onRefresh, data }) => {
	// eslint-disable-next-line no-unused-vars
	const [formData, setFormData] = useState(data)
	const [file, setFile] = useState(null)

	const messageInputRef = useRef()

	const authCtx = useContext(AuthContext)
	const isLoggedIn = authCtx.isLoggedIn

	const handlePicture = (event) => {
		setFile(event.target.files[0])
	}

	const submitHandler = (e) => {
		e.preventDefault()

		const enteredMessage = messageInputRef.current.value

		const formData = new FormData()
		formData.append('message', enteredMessage)
		formData.append('image', file)

		const url = 'http://localhost:4000/api/post/'

		const formFetchHandler = async () => {
			try {
				console.log('je suis dans le try POST')
				const postData = await fetch(url, {
					method: 'POST',
					body: formData,
					headers: {
						'Accept': 'multipart/form-data',
						Authorization: `Bearer ${authCtx.token}`,
					},
				})

				const postDataResult = await postData.json()

				if (postData.ok) {
					setFormData(postDataResult)
				}
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}

		formFetchHandler()

		messageInputRef.current.value = ''
	}

	useLayoutEffect(() => {
		onRefresh()
	}, [formData])


	return (
		<div>
			{isLoggedIn && (
				<section>
					<form onSubmit={submitHandler}>
						<label htmlFor="message">Votre message</label>
						<input
							type="text"
							id="message"
							name="message"
							ref={messageInputRef}
							required
						/>
						<label htmlFor="file">Votre image</label>
						<input
							type="file"
							id="file"
							name="file"
							onChange={(event) => handlePicture(event)}
						/>
						<Button type={'submit'}>Publier</Button>
					</form>
				</section>
			)}
		</div>
	)
}

export default PostForm
