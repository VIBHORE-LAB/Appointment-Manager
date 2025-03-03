import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from "../components/footer";
import Navbar from '../components/Navbar';


function ResetPasssword() {
    const location= useLocation();
    const email=location.state?.email || '';
    console.log(email);
    const[otp,setOtp]=useState('');
    const[newPassword,setNewPassword]=useState('');
    const[confirmNewPassword,setConfirmNewPassword]=useState('');
    const[isLoading,setIsLoading]=useState(false);
    const[message,setMessage]= useState('');
    const[error,setError]= useState('');
    const navigate= useNavigate();

    const handleSubmit= async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        if(confirmNewPassword===newPassword){
            try{
                await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });           
                setMessage('Password reset successfully! Redirecting...');
      setTimeout(() => navigate('/log-in'), 2000);

            }

            catch(err){
                setError(e.response?.data?.message || 'An error occurred');

            }
        }

        else{
            setMessage("Passwords Doesn't Match");
        }
    }


  return (
    <>
    <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-96 p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                 
              </div>

              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
                </label>
                <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                 
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-9w00 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-green-600 text-center">{message}</p>}
            {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          </div>
        </div>
        <Footer />
      </div>
    </>
    
  )
}

export default ResetPasssword