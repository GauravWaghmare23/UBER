import { createContext, useContext, useState } from "react"

const CaptainContext = createContext()

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null)

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    )
}

const useCaptainData = () => useContext(CaptainContext)

// eslint-disable-next-line react-refresh/only-export-components
export { CaptainContextProvider, useCaptainData }