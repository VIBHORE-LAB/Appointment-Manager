import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogOut = async () => {
            try {
                await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
                console.log("Log Out Successful");
                navigate('/'); 
            } catch (err) {
                console.error("Log Out error", err.response?.data || err);
                navigate('/user/dashboard'); 
            }
        };

        handleLogOut();
    }, [navigate]); 

    return <div>Logging out...</div>; 
}
