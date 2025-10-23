import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useUserData} from "../contexts/UserContext"

const UserLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUserData();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, { withCredentials: true });
            if (res.status === 201) {
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role")
                navigate("/user-login");
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div>
          <button onClick={handleLogout} className='w-full px-4 py-2 bg-red-600 text-white font-normal text-xl rounded'>
              Logout
      </button>
    </div>
  )
}

export default UserLogout
