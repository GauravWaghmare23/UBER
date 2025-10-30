import React, { useRef, useState } from 'react'
import UserLogout from '../components/UserLogout'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

    const [pickUp, setPickUp] = useState("")
    const [destination, setDestination] = useState("")
    const [openToggle, setOpenToggle] = useState(false)
    const usePanel = useRef(null);
    const panelClose = useRef(null);
    const vehiclePanelRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel,setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);
    const [lookingDriverPanel,setLookingDriverPanel] = useState(false);
    const lookingDriverRef = useRef(null);
    const [waitingDriverPanel,setWaitingDriverPanel] = useState(false);
    const waitingDriverRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here if needed
    }

    // --- GSAP Animation Hooks ---

    // Animate Location Search Panel
    useGSAP(function () {
        if (openToggle) {
            gsap.to(usePanel.current, {
                height: "70%"
            })
            gsap.to(panelClose.current, {
                opacity: 1
            })
        } else {
            gsap.to(usePanel.current, {
                height: "0%"
            })
            gsap.to(panelClose.current, {
                opacity: 0
            })
        }
    }, [openToggle]) // Removed panelClose from dependency array

    // Animate Vehicle Panel
    useGSAP(function(){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(0)",
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(100%)",
            })
        }
    },[vehiclePanel]) // Removed vehiclePanelRef from dependency array

    // Animate Confirm Ride Panel
    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform: "translateY(0)",
            })
        }else{
            gsap.to(confirmRidePanelRef.current, {
                transform: "translateY(100%)",
            })
        }
    },[confirmRidePanel])

    // Animate Looking For Driver Panel
    useGSAP(function(){
        if(lookingDriverPanel){
            gsap.to(lookingDriverRef.current, {
                transform: "translateY(0)",
            })
        }else{
            gsap.to(lookingDriverRef.current, {
                transform: "translateY(100%)",
            })
        }
    },[lookingDriverPanel])

    // Animate Waiting For Driver Panel
    useGSAP(function(){
        if(waitingDriverPanel){
            gsap.to(waitingDriverRef.current, {
                transform: "translateY(0)",
            })
        }else{
            gsap.to(waitingDriverRef.current, {
                transform: "translateY(100%)",
            })
        }
    },[waitingDriverPanel]) // Removed waitingDriverRef from dependency array

    // --- Component JSX ---
    return (
        <div className='h-screen w-screen relative overflow-hidden'>
            <img className='w-20 absolute left-4' src="https://cdn-icons-png.flaticon.com/128/5969/5969183.png" alt="" />
            <div className='h-full w-full'>
                <img className='h-full w-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gjBf1FfBqt8CfC2GaDdvtNUtCDmsHeTKaw&s" alt="" />
            </div>
            <div className='h-screen w-full flex flex-col justify-end absolute top-0'>
                <div className='h-[30%] relative  bg-white w-full p-4'>
                    <h2 ref={panelClose} onClick={() => {
                        setOpenToggle(false)
                    }} className='absolute right-5 opacity-0'><i className="ri-arrow-down-s-fill text-5xl"></i></h2>
                    <h2 className='text-2xl font-semibold py-2 mb-4'>Find a ride</h2>
                    <form onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        <input onClick={() => {
                            setOpenToggle(true)
                        }} value={pickUp} onChange={(e) => {
                            setPickUp(e.target.value)
                        }} className='w-full focus:outline-none focus:ring-2 focus:ring-black px-4 py-3 mb-6 bg-gray-200 rounded-lg' type="text" placeholder='Enter your pick-up location' />
                        <input onClick={() => {
                            setOpenToggle(true)
                        }} value={destination} onChange={(e) => {
                            setDestination(e.target.value)
                        }} className='w-full focus:outline-none focus:ring-2 focus:ring-black px-4 py-3 mb-6 bg-gray-200 rounded-lg' type="text" placeholder='Enter your destination' />
                    </form>
                </div>
                <div ref={usePanel} className='bg-white w-full pt-4'>
                    <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setOpenToggle={setOpenToggle} />
                </div>
            </div>
            
            {/* Vehicle Panel - Has 'translate-y-full' */}
            <div ref={vehiclePanelRef} className="fixed bottom-0 z-10 translate-y-full w-full bg-white px-4 py-3">
                <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
            </div>
            
            {/* FIX: Confirm Ride Panel - Added 'translate-y-full' */}
            <div ref={confirmRidePanelRef} className="fixed bottom-0 z-10 translate-y-full w-full bg-white py-3">
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} setLookingDriverPanel={setLookingDriverPanel} />
            </div>
            
            {/* FIX: Looking For Driver Panel - Added 'translate-y-full' */}
            <div ref={lookingDriverRef} className="fixed bottom-0 z-10 translate-y-full w-full bg-white py-3">
                <LookingForDriver setLookingDriverPanel={setLookingDriverPanel} />
            </div>
            
            {/* Waiting For Driver Panel - Missing 'translate-y-full' but has correct GSAP. Added 'translate-y-full' for consistency/safety */}
            <div ref={waitingDriverRef} className="fixed bottom-0 z-10 translate-y-full w-full bg-white">
                <WaitingForDriver setWaitingDriverPanel={setWaitingDriverPanel} />
            </div>
        </div>
    )
}

export default Home