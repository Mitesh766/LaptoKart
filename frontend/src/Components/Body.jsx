import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { ToastContainer } from 'react-toastify';
import useUserData from '../hooks/useUserData.js';


const Body = () => {
  useUserData();
  return (
    <div className="bg-[#0F172A] text-white min-h-screen">
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
