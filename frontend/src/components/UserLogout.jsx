import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserData } from "../contexts/UserContext";

const UserLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUserData();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.status === 201) {
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/user-login");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Failed to logout');
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-8 left-0 right-0 text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      <button 
        onClick={handleLogout} 
        disabled={isLoading}
        className={`w-full px-4 py-2 bg-red-600 text-white font-normal text-xl rounded flex justify-center items-center ${isLoading ? 'opacity-75' : 'hover:bg-red-700'}`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
          'Logout'
        )}
      </button>
    </div>
  )
}

export default UserLogout
