import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserData } from '../contexts/UserContext'
import { useCaptainData } from '../contexts/CaptainContext'

const NonProtectedRoute = ({ children }) => {
    const { user } = useUserData()
    const { captain } = useCaptainData()
    const role = localStorage.getItem('role')

    if (role === 'user' && user) {
        return <Navigate to="/home" replace />
    }

    if (role === 'captain' && captain) {
        return <Navigate to="/captain-home" replace />
    }

    return children
}

export default NonProtectedRoute