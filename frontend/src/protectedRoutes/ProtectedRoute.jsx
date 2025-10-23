import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserData } from '../contexts/UserContext'
import { useCaptainData } from '../contexts/CaptainContext'

const ProtectedRoute = ({ children, role }) => {
    const { user } = useUserData()
    const { captain } = useCaptainData()
    const storedRole = localStorage.getItem("role")

    if (role === "user") {
        if (storedRole !== "user") return <Navigate to="/user-login" replace />
        if (!user) return <div>Loading user...</div>
        return children
    }

    if (role === "captain") {
        if (storedRole !== "captain") return <Navigate to="/captain-login" replace />
        if (!captain) return <div>Loading captain...</div>
        return children
    }

    return <Navigate to="/" replace />
}

export default ProtectedRoute