import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'

const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App