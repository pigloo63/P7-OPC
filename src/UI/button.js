/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react'

const Button = (props) => {
	return (
		<button
			type={props.type || 'button'}
			className="btn-type"
			onClick={props.onClick}
			id={props.id}
		>
			{props.children}
		</button>
	)
}

export default Button
