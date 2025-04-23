import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md mb-10 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-wide text-blue-700 dark:text-white">
            {"𝕃𝕒𝕡𝕥𝕠𝕂𝕒𝕣𝕥"}
          </span>
        </a>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700 dark:text-gray-200">
          <li><a href="#" className="hover:text-blue-600">Shop</a></li>
          <li><a href="#" className="hover:text-blue-600">Brands</a></li>
          <li><a href="#" className="hover:text-blue-600">Deals</a></li>
          <li><a href="#" className="hover:text-blue-600">Cart</a></li>
          <li><a href="#" className="hover:text-blue-600">Login</a></li>
        </ul>

        {/* Mobile Menu and Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button className="relative text-gray-700 dark:text-white hover:text-blue-600">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1.5 rounded-full">3</span>
          </button>

          {/* User Icon */}
          <button className="text-gray-700 dark:text-white hover:text-blue-600">
            <FaUserCircle size={24} />
          </button>

          {/* Hamburger for mobile */}
          <button className="md:hidden text-gray-700 dark:text-white hover:text-blue-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
