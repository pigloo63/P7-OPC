/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useRef, useState, useEffect, useLayoutEffect } from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'

const ModifyPost = ({ id, onRefresh, data }) => {
	const [updatePost, setUpdatePost] = useState(data)
	const [modificationPost, setModificationPost] = useState(false)
	const [file, setFile] = useState(null)

	const authCtx = useContext(AuthContext)

	const url = `http://localhost:4000/api/post//${id}`

	const messageInputRef = useRef()

	const handlePicture = (event) => {
		setFile(event.target.files[0])
	}

	const submitHandler = (e) => {
		e.preventDefault()

		const enteredMessage = messageInputRef.current.value

		const formData = new FormData()
		formData.append('message', enteredMessage)
		if(file){formData.append('image', file)}

		const fetchModify = async () => {
			try {
				console.log('je suis dans le try MODIFY')
				const modifyPost = await fetch(url, {
					method: 'PUT',
					body: formData,
					headers: {
						'Accept': 'multipart/form-data',
						Authorization: `Bearer ${authCtx.token}`,
					},
				})

				const modifyPostResult = await modifyPost.json()
				console.log(modifyPostResult)

				if(modifyPost.ok){
					setUpdatePost(modifyPostResult)
				}

			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}
		fetchModify()
	}

	//Modification des données sur la page
	const modificationHandler = () => {
		setModificationPost((modifyPost) => !modifyPost)
	}

	useLayoutEffect(() => {
		onRefresh()
	},[updatePost])


	return (
		<div>
			{modificationPost && (
				<section>
					<form onSubmit={submitHandler}>
						<label htmlFor="message">Votre nouveaux message</label>
						<input
							type="text"
							id="message"
							name="message"
							ref={messageInputRef}
							required
						/>
						<label htmlFor="image">Votre image</label>
						<input
							type="file"
							id="file"
							name="file"
							onChange={(event) => handlePicture(event)}
						/>
						{<Button
							type={'submit'}>
                            Publier
						</Button>}
					</form>
				</section>
			)}
			{!modificationPost && (
				<Button type={'submit'} onClick={modificationHandler}>
                    Modifier
				</Button>
			)}
		</div>
	)
}

export default ModifyPost
