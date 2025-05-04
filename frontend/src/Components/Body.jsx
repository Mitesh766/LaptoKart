import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { ToastContainer } from 'react-toastify';
import useUserData from '../hooks/useUserData.js';
import { useSelector } from 'react-redux';


const Body = () => {
  useUserData();
  const isUserFetched = useSelector((state) => state.user.isUserFetched);

  if (!isUserFetched) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading user data...</p>
      </div>
    );
  }
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
