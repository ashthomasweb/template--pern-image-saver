// index.js

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/:edit/:id' element={<App />} />
        <Route path='/' element={<App />} />
        <Route path='/image' element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)

// END of document
