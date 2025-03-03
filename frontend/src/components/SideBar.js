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
        className={`fixed left-0 top-0 h-screen bg-gray-800 text-white shadow-lg transition-all duration-300 z-20 flex flex-col ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          {!isCollapsed && <h1 className="text-2xl font-bold">Menu</h1>}
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
          </button>
        </div>
        <nav className="mt-6 flex flex-col gap-2">
          <Link
            to="/edit-profile"
            className="flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 transition duration-300"
          >
            <FaUser size={30} className="mr-3" />
            {!isCollapsed && "Edit Profile"}
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 transition duration-300"
          >
            <FaCog size={30} className="mr-3" />
            {!isCollapsed && "Settings"}
          </Link>
          <Link
            to="/logout"
            className="flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 transition duration-300"
          >
            <FaSignOutAlt size={30} className="mr-3" />
            {!isCollapsed && "Log Out"}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
