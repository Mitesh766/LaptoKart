import React from 'react';
import { FaShoppingCart, FaUserCircle, FaRegHeart } from 'react-icons/fa'; // Added FaRegHeart for Wishlist
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const NavBar = () => {
  const userInfo = useSelector((store) => store.user.userInfo);
  const cartCount = useSelector((store) => store.cart.cartCount);
  const wishlistCount = useSelector((store) => store.wishlist.wishlistCount);
  const location = useLocation();

  const hideIcons = !userInfo || location.pathname === "/login";

  return (
    <nav className="bg-[#1A365D] shadow-md mb-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-wide text-white p-2 border-2 border-gray-500 rounded-xl">
            {"𝕃𝕒𝕡𝕥𝕠𝕂𝕒𝕣𝕥"}
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-200">
          <li><Link to="/" className="hover:text-blue-400">Shop</Link></li>
          <li><Link to="/brands" className="hover:text-blue-400">Brands</Link></li>
          <li><Link to="/deals" className="hover:text-blue-400">Deals</Link></li>
          
          <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li> {/* Added Profile */}
          <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
        </ul>

        {/* Icons */}
        <div className={`flex items-center space-x-4 ${hideIcons ? "invisible" : ""}`}>
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative text-white hover:text-blue-400">
            <FaRegHeart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1.5 rounded-full">
              {wishlistCount || 0} {/* Display Wishlist Count */}
            </span>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-white hover:text-blue-400">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1.5 rounded-full">
              {cartCount || 0} {/* Display Cart Count */}
            </span>
          </Link>

          {/* User Icon */}
          <Link to="/profile" className="text-white hover:text-blue-400">
            <FaUserCircle size={24} />
          </Link>

          {/* Mobile Hamburger Icon */}
          <button className="md:hidden text-white hover:text-blue-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
