import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Footer from "../components/footer";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/sign-up', formData);
      console.log('Registration Successful', res.data);
      navigate('/log-in');
    } catch (err) {
      console.error('Registration Unsuccessful', err.response?.data || err);
      if (err.response?.data?.message === 'Email already exists') {
        setError('Email already exists'); // Set error message
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-8 mt-5 mb-5 rounded-lg bg-white p-6 shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join us to start managing your appointments efficiently.</p>
          </div>

          <form className="pl-7 pt-8 pr-7" onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="block mb-2 text-gray-700 text-lg font-bold">
              First Name
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-12 w-80 px-3 py-3 border rounded-2xl placeholder:opacity-50 text-sm"
                />
              </div>
            </label>

            <label htmlFor="lastName" className="block mb-2 text-gray-700 text-lg font-bold">
              Last Name
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-12 w-80 px-3 py-3 border rounded-2xl placeholder:opacity-50 text-sm"
                />
              </div>
            </label>

            <label htmlFor="username" className="block mb-2 text-gray-700 text-lg font-bold">
              Username
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Your Full Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="h-12 w-80 px-3 py-3 border rounded-2xl placeholder:opacity-50 text-sm"
                />
              </div>
            </label>

            <label htmlFor="email" className="block mb-2 text-gray-700 text-lg font-bold">
              Email
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-12 w-80 px-3 py-3 border rounded-2xl placeholder:opacity-50 text-sm ${error ? 'border-red-500' : ''}`}
                />
              </div>
            </label>

            <label htmlFor="password" className="block mb-2 text-gray-700 text-lg font-bold">
              Password
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 w-80 px-3 py-3 border rounded-2xl placeholder:opacity-50 text-sm"
                />
              </div>
            </label>

            <label htmlFor="role" className="block mb-2 text-gray-700 text-lg font-bold">
              Role
              <div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-12 w-80 px-3 py-3 border rounded-2xl hover:bg-slate-100"
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </label>

            <button
              type="submit"
              className="bg-gray-800 w-full text-white font-bold py-2 px-4 rounded mt-4 hover:bg-gray-950"
            >
              Register
            </button>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="text-black bg-white border-{1.5} border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-600 dark:border-gray-600"
              onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
            >
              <FontAwesomeIcon className="mr-2 h-4 w-4" icon={faGoogle} />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
