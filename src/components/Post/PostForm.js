/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext, useEffect } from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'
import '../../styles/postForm.css'

const PostForm = ({ onRefresh, data }) => {
	// eslint-disable-next-line no-unused-vars
	const [formData, setFormData] = useState(data)
	const messageInputRef = useRef()
	const imageInputRef = useRef()

	const authCtx = useContext(AuthContext)
	const isLoggedIn = authCtx.isLoggedIn

	const submitHandler = (e) => {
		e.preventDefault()

		const enteredMessage = messageInputRef.current.value
		let enteredImage = imageInputRef.current.files[0]

		const formData = new FormData()
		formData.append('message', enteredMessage)
		formData.append('image', enteredImage)

		const url = 'http://localhost:4000/api/post/'

		const formFetchHandler = async () => {
			try {
				console.log('je suis dans le try POST')
				const postData = await fetch(url, {
					method: 'POST',
					body: formData,
					headers: {
						Accept: 'multipart/form-data',
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
		imageInputRef.current.value = null

	}

	useEffect(() => {
		onRefresh()
	}, [formData])

	return (
		<div>
			{isLoggedIn && (
				<section>
					<form onSubmit={submitHandler} className="post-form">
						<h2>Votre nouveau commentaire</h2>
						<label className='label-form'>Votre message:</label>
						<input
							type="text"
							id="message"
							name="message"
							ref={messageInputRef}
							placeholder="Bonjour à tous"
							required
							className="input-field-form"
						/>
						<label className='label-form'>Votre Image</label>
						<input
							type="file"
							id="file"
							name="file"
							ref={imageInputRef}
						/>
						<Button type={'submit'}>Publier</Button>
					</form>
				</section>
			)}
		</div>
	)
}

export default PostForm
