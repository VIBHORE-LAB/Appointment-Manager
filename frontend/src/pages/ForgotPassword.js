import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('OTP sent successfully. Check your email!');
      setTimeout(() => navigate('/reset-password',{state:{email}}), 1000); 
    } catch (e) {
      setError(e.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
       
        <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-8 bg-white rounded-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-green-600 text-center">{message}</p>}
            {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          </div>
        </div>

        {/* Fixed Footer at Bottom */}
        <Footer />
      </div>
    </>
  );
}

 
