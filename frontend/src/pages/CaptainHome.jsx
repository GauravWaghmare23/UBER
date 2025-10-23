import React from 'react'
import CaptainLogout from '../components/CaptainLogout'
import { useCaptainData } from '../contexts/CaptainContext'

const CaptainHome = () => {
    const { captain } = useCaptainData()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Captain</h1>
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <span className="font-semibold">First Name:</span> {captain.fullName?.firstName}
                        </div>
                        <div>
                            <span className="font-semibold">Last Name:</span> {captain.fullName?.lastName}
                        </div>
                        <div>
                            <span className="font-semibold">Email:</span> {captain.email}
                        </div>
                        <div>
                            <span className="font-semibold">Vehicle Type:</span> {captain.vehicle?.vehicleType}
                        </div>
                        <div>
                            <span className="font-semibold">Plate:</span> {captain.vehicle?.plate}
                        </div>
                        <div>
                            <span className="font-semibold">Color:</span> {captain.vehicle?.color}
                        </div>
                        <div>
                            <span className="font-semibold">Capacity:</span> {captain.vehicle?.capacity}
                        </div>

                        <CaptainLogout />
                    </div>
            </div>
        </div>
    )
}

export default CaptainHome