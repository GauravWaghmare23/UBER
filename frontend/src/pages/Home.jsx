import React from 'react'
import { useUserData } from '../contexts/UserContext'
import UserLogout from '../components/UserLogout'

const Home = () => {
    const { user } = useUserData()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Home</h1>

                {user ? (
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <span className="font-semibold">First Name:</span> {user.fullName?.firstName}
                        </div>
                        <div>
                            <span className="font-semibold">Last Name:</span> {user.fullName?.lastName}
                        </div>
                        <div>
                            <span className="font-semibold">Email:</span> {user.email}
                        </div>

                        <UserLogout />
                    </div>
                ) : (
                    <h2 className="text-center text-gray-500">Loading user data...</h2>
                )}
            </div>
        </div>
    )
}

export default Home