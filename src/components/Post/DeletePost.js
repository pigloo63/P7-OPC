/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import AuthContext from '../../Context/authContext'
import Button from '../../UI/button'

// eslint-disable-next-line react/prop-types
const DelePost = ({ id, data, onRefresh }) => {
	const [newData, setNewData] = useState(data)

	const authCtx = useContext(AuthContext)

	const url = `http://localhost:4000/api/post//${id}`

	const deleteHandler = (event) => {
		event.preventDefault()

		const fetchDelete = async () => {
			try {
				console.log('Je suis dans le try DELETE')
				const deletePost = await fetch(url, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${authCtx.token}`,
					},
				})

				if (deletePost.ok) {
					setNewData(deletePost)
				}
			} catch (error) {
				console.log('Pas de réponse de l\'API')
			}
		}
		fetchDelete()
	}

	useLayoutEffect(() => {
		onRefresh()
	}, [newData])


	return (
		<div>
			<form onSubmit={deleteHandler}>
				<Button type={'submit'}>Supprimer</Button>
			</form>
		</div>
	)
}

export default DelePost
