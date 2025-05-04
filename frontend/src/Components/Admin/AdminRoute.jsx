// AdminRoute.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const user = useSelector((store) => store.user?.userInfo);
  const location = useLocation();

  useEffect(() => {
    if (user && !user.isAdmin) {
      toast.error("Access denied: You are not an authorized admin.");
    }
  }, [user]);

  if (!user) {
    toast.error("You need to log in first.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default AdminRoute;
