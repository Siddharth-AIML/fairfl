import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './assets/styles/global.css'
import './assets/styles/variables.css'

import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)