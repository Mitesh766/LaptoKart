import React, { useEffect, useState } from 'react';
import { USERS_URL } from '../utils/constants';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCartCount } from '../redux/cartSlice';
import { setWishlistCount } from '../redux/wishlistSlice';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(store => store.user.userInfo);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    if (userData) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const { data } = await axios.post(`${USERS_URL}/login`, {
        email: email.trim(),
        password: password.trim()
      }, {
        withCredentials: true
      });

      dispatch(setUserData(data.data.userData));
      dispatch(setCartCount(data.data.cartCount));
      dispatch(setWishlistCount(data.data.wishlistCount));
      toast.success("Login successful!");
      navigate(from);
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !username.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(`${USERS_URL}/register`, {
        email: email.trim(),
        name: username.trim(),
        password: password.trim()
      }, { withCredentials: true });

      dispatch(setUserData(data.data.userData));
      dispatch(setCartCount(data.data.cartCount));
      dispatch(setWishlistCount(data.data.wishlistCount));
      toast.success("Account created successfully!");
      navigate(from);
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[1/2] bg-gray-900 text-white px-4">
      <div className="w-full max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
        <form className="space-y-6" onSubmit={isSignIn ? handleLogin : handleSignUp}>
          <h5 className="text-xl font-medium">
            {isSignIn ? "Sign in" : "Sign Up"} to our platform
          </h5>

          {!isSignIn && (
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Enter your full name"
                onChange={(e) => setUserName(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
              focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
          >
            {isSignIn ? "Login to your account" : "Create your account"}
          </button>

          <div className="text-sm font-medium text-gray-400">
            {isSignIn ? "Not registered?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-blue-400 hover:underline"
            >
              {isSignIn ? "Create account" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
