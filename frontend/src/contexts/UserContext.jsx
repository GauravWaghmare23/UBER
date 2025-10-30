import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserData = () => useContext(UserContext)

// eslint-disable-next-line react-refresh/only-export-components
export { UserContextProvider, useUserData }