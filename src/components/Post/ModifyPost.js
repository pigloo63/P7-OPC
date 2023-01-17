/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
	useContext,
	useRef,
	useState,
	useEffect,
	useLayoutEffect,
} from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'
import '../../styles/modifyPost.css'

const ModifyPost = ({ id, onRefresh, data, imageUrl, message, userId }) => {
	const [updatePost, setUpdatePost] = useState(data)
	const [modificationPost, setModificationPost] = useState(false)
	const [file, setFile] = useState(null)
	const [messageSaved, setMessageSaved] = useState(message)

	const authCtx = useContext(AuthContext)
	const isAdmin = authCtx.userAdmin

	const url = `http://localhost:4000/api/post//${id}`

	const messageInputRef = useRef()
	const imageInputRef = useRef()

	const handlePicture = (event) => {
		setFile(event.target.files[0])
	}

	const handleMessage = (event) => {
		setMessageSaved(event.target.value)
	}

	const submitHandler = () => {
		const enteredMessage = messageInputRef.current.value

		const formData = new FormData()
		formData.append('message', enteredMessage)
		if (file) {
			formData.append('image', file)
		}

		const fetchModify = async () => {
			try {
				console.log('je suis dans le try MODIFY')
				const modifyPost = await fetch(url, {
					method: 'PUT',
					body: formData,
					headers: {
						Accept: 'multipart/form-data',
						Authorization: `Bearer ${authCtx.token}`,
					},
				})

				const modifyPostResult = await modifyPost.json()
				console.log(modifyPostResult)

				if (modifyPost.ok) {
					setUpdatePost(modifyPostResult)
				}
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}
		fetchModify()
	}

	useLayoutEffect(() => {
		onRefresh()
	}, [updatePost])


	//Modification des données sur la page
	const modificationHandler = () => {
		setModificationPost((modifyPost) => !modifyPost)
	}

	function returnModificationHandler() {
		if (message != messageInputRef) {
			submitHandler()
			setModificationPost(false)
		}
	}

	return (
		<div className="container-modify">
			{modificationPost && (
				<section className="section-modify">
					{(userId === authCtx.userId || isAdmin) && (
						<div className="background-modify">
							<form
								onSubmit={submitHandler}
								className="modify-form"
							>
								<label
									htmlFor="message"
									className="label-formModify"
								>
                                    Votre nouveaux message
								</label>
								<input
									type="text"
									id="message"
									name="message"
									value={messageSaved}
									onChange={handleMessage}
									ref={messageInputRef}
									placeholder="Nouveau message"
									required
									className="modify-text-field"
								/>
								{imageUrl && (
									<label
										htmlFor="Image"
										className="label-formModify"
									>
                                        Votre nouvelle image
									</label>
								)}
								{imageUrl && (
									<input
										type="file"
										id="file"
										name="file"
										ref={imageInputRef}
										onChange={(event) =>
											handlePicture(event)
										}
									/>
								)}
								<div className="button">
									<Button
										type={'submit'}
										onClick={returnModificationHandler}
										className="modal-modify-button"
									>
                                        Publier
									</Button>
									<Button
										onClick={modificationHandler}
										className="modal-modify-button"
									>
                                        Retour
									</Button>
								</div>
							</form>
						</div>
					)}
				</section>
			)}
			<div className="modify-button">
				{(userId === authCtx.userId || isAdmin === true) && (
					<Button onClick={modificationHandler} id={'modify-btn'} className='btn-type'>
						{!modificationPost ? 'Modifier' : 'Retour'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ModifyPost
