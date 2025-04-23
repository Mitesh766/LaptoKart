import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'

const Body = () => {
  return (
    <div className="bg-gray-900">
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Body