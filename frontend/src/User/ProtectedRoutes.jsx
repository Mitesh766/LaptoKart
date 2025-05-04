// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user?.userInfo); 

  if (!user) {
    toast.error("Please login to continue");
    return <Navigate to="/login" replace/>;
  }

  return children; 
};

export default ProtectedRoute;
