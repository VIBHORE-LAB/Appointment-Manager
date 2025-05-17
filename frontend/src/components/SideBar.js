import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import necessary icons

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse/expand

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    {/* Overlay (only when sidebar is open) */}
    {!isCollapsed && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={toggleSidebar}
      ></div>
    )}
  
    {/* Sidebar */}
    <div
      className={`fixed left-0 top-0 h-screen bg-white text-black shadow-lg transition-all duration-300 z-[50] flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-300 relative z-[60]">
        {!isCollapsed && <h1 className="text-xl font-bold">Menu</h1>}
        <button onClick={toggleSidebar} className="text-black focus:outline-none z-[70]">
          {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
        </button>
      </div>
  
      {/* Sidebar Links */}
      <nav className="mt-4 flex flex-col gap-2">
        <Link
          to="/user/dashboard"
          className="flex items-center px-4 py-3 text-black hover:bg-gray-200 transition duration-300 text-lg"
        >
          <FaUser size={24} className="min-w-[30px] mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>Dashboard</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-3 text-black hover:bg-gray-200 transition duration-300 text-lg"
        >
          <FaCog size={24} className="min-w-[30px] mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>Settings</span>
        </Link>
        <Link
          to="/log-out"
          className="flex items-center px-4 py-3 text-black hover:bg-gray-200 transition duration-300 text-lg"
        >
          <FaSignOutAlt size={24} className="min-w-[30px] mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>Log Out</span>
        </Link>
      </nav>
    </div>
  </>
  
  );
};

export default SideBar;
