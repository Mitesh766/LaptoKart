import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 fixed bottom-0 w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo Section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">{"¯`·.¸¸.·´¯`·.¸¸.-> 𝕃𝕒𝕡𝕥𝕠𝕂𝕒𝕣𝕥 <-.¸¸.·´¯`·.¸¸.·´¯"}</span>
            </a>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="hover:text-blue-500">Shop</a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-blue-500">Wishlist</a>
              </li>
              <li>
                <a href="/orders" className="hover:text-blue-500">Orders</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-500">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact Info Section */}
          <div className="w-full md:w-1/3">
            <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-white hover:text-blue-500" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M22 2H2a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
                </svg>
              </a>
              <a href="https://www.instagram.com" className="text-white hover:text-blue-500" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </a>
              <a href="https://www.twitter.com" className="text-white hover:text-blue-500" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M23.634 4.594c-.882.392-1.83.656-2.83.775 1.017-.607 1.8-1.567 2.165-2.723-.951.564-2.006.975-3.127 1.194-.896-.957-2.176-1.557-3.594-1.557-3.205 0-5.563 2.666-5.563 5.953 0 .468.045.92.126 1.355-4.672-.234-8.796-2.397-11.544-5.736-.484.852-.762 1.834-.762 2.88 0 1.99 1.067 3.74 2.688 4.78-.988-.032-1.924-.296-2.734-.741v.075c0 2.773 1.98 5.167 4.627 5.688-.484.139-.991.214-1.505.214-.368 0-.73-.036-1.089-.105.73 2.351 2.855 4.058 5.378 4.105-1.961 1.57-4.429 2.503-7.111 2.503-.465 0-.92-.027-1.375-.079 2.542 1.619 5.556 2.553 8.752 2.553 10.497 0 16.28-8.433 16.28-15.744 0-.242-.007-.483-.021-.724 1.114-.804 2.083-1.81 2.834-2.972z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Contact us: <span className="text-gray-300">support@laptopkart.com</span>
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LaptopKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
