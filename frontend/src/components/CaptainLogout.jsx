import { useNavigate } from "react-router-dom"
import { useCaptainData } from "../contexts/CaptainContext"
import axios from "axios"

const CaptainLogout = () => {
    const navigate = useNavigate()
    const { setCaptain } = useCaptainData()

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                withCredentials: true
            })

            if (res.status === 201) {
                setCaptain(null)
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                navigate("/captain-login")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <button
                onClick={handleLogout}
                className='w-full px-4 py-2 bg-red-600 text-white font-normal text-xl rounded'
            >
                Logout
            </button>
        </div>
    )
}

export default CaptainLogout