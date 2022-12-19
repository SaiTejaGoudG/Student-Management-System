import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login/index'
import Home from './components/Home/index'
import Update from './components/Update/index'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Update" element={<Update />} />
    </Routes>
  </BrowserRouter>
)
export default App
