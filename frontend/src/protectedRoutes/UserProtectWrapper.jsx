import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../contexts/UserContext';

const UserProtectWrapper = ({ children }) => {
    const { setUser } = useUserData();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/user-login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate("/user-login");
            }
        };

        fetchUser();
    }, [token, navigate, setUser]);

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;