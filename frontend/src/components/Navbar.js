import React from 'react';
import '../App.css';
import navbarLogo from '../assets/navbar_logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-50"
                src={navbarLogo} 
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Log-In
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
