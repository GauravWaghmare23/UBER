import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const CaptainContext = createContext()

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null)

    useEffect(() => {
        const fetchCaptain = async () => {
            const role = localStorage.getItem("role")
            if (role !== "captain") return
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
                    withCredentials: true
                })
                setCaptain(res.data.captain)
            } catch (err) {
                console.log(err)
                setCaptain(null)
            }
        }

        fetchCaptain()
    }, [setCaptain, captain])

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    )
}

const useCaptainData = () => useContext(CaptainContext)

// eslint-disable-next-line react-refresh/only-export-components
export { CaptainContextProvider, useCaptainData }