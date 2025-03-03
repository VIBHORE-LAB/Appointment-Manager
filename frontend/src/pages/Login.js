import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Footer from "../components/footer";
import Cookies from 'js-cookie';  // Import js-cookie for handling cookies
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/log-in', { email, password }, { withCredentials: true });
      
      console.log("Login Successful");
  
      const { token, businessId } = response.data; 
  
      Cookies.set('authToken', token, { expires: 7, path: '' });
  
      if (businessId) {
        navigate(`/dashboard/${businessId}`);
      } else {
        navigate('/dashboard');  
      }
  
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  

  

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Log in to your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-lg font-bold">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg font-bold">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a className="font-medium text-blue-600 hover:text-blue-500" href="/forgot-password">
                  Forgot your password? 
                </a>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div>
              <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign in
              </button>

            </div>

            <div>
               <button
                type="button"
                className="text-black bg-white border-{1.5} border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-600 dark:border-gray-600"
                onClick={() => window.location.href = "http://localhost:5000/api/auth/google"} // Use HTTP here
              >
                <FontAwesomeIcon className="mr-2 h-4 w-4" icon={faGoogle} />
                Sign in with Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a className="font-semibold leading-6 text-blue-600 hover:text-blue-500" href="/sign-up">
              Register now
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
