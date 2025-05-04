// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const user = useSelector((store) => store.user?.userInfo);
  const location = useLocation();
  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
