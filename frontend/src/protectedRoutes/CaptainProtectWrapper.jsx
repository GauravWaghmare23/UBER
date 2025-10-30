import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaptainData } from '../contexts/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
    const { setCaptain } = useCaptainData();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/captain-login");
            return;
        }

        const fetchCaptain = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    setCaptain(response.data.captain);
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        };

        fetchCaptain();
    }, [token, navigate, setCaptain]);

    return (
        <>
            {children}
        </>
    );
};

export default CaptainProtectWrapper;