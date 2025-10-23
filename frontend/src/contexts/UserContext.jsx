import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const role = localStorage.getItem("role")
            if (role !== "user") return
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
                    withCredentials: true
                })
                setUser(res.data.user)
            } catch (err) {
                console.log(err)
                setUser(null)
            }
        }

        fetchUser()
    }, [setUser, user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserData = () => useContext(UserContext)

// eslint-disable-next-line react-refresh/only-export-components
export { UserContextProvider, useUserData }