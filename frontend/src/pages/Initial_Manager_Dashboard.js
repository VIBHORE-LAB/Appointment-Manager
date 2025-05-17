import React from 'react';
import { Link } from 'react-router-dom';
import logo_cropped from '../assets/logo_cropped.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/Navbar'; 

const InitialManagerDashboard = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <img 
                className="mx-auto h-24 w-24 text-gray-400" 
                src={logo_cropped} 
                alt="Logo"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome to Appointment Manager
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                You have not registered any business yet
              </p>
              <div className="mt-8">
                <Link 
                  to="/create-business" 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Register Business
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Register your business to start managing appointments and services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with full width */}
      <Footer className="w-full" />
    </div>
  );
};

export default InitialManagerDashboard;
