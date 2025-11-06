import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCaptainData } from "../contexts/CaptainContext";
import axios from "axios";

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useCaptainData();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.status === 201) {
                setCaptain(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/captain-login");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Failed to logout');
        } finally {
            setIsLoading(false);
        }
    }

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

export default CaptainLogout