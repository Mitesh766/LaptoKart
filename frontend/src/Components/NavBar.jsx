import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="bg-[#1A365D] shadow-md mb-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-wide text-white p-2 border-2 border-gray-500 rounded-xl">
            {"𝕃𝕒𝕡𝕥𝕠𝕂𝕒𝕣𝕥"}
          </span>
        </a>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-200">
          <li><a href="#" className="hover:text-blue-400">Shop</a></li>
          <li><a href="#" className="hover:text-blue-400">Brands</a></li>
          <li><a href="#" className="hover:text-blue-400">Deals</a></li>
          <li><a href="#" className="hover:text-blue-400">Cart</a></li>
          <li><a href="#" className="hover:text-blue-400">Login</a></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button className="relative text-white hover:text-blue-400">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1.5 rounded-full">3</span>
          </button>

          {/* User Icon */}
          <button className="text-white hover:text-blue-400">
            <FaUserCircle size={24} />
          </button>

          {/* Mobile Hamburger Icon */}
          <button className="md:hidden text-white hover:text-blue-400 focus:outline-none">
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
