/* eslint-disable linebreak-style */
import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthContextProvider } from './Context/authContext'
import '../src/styles/index.css'


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>
)
