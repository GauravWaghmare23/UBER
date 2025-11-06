import React, { useRef, useState } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import axios from 'axios';
import { useCaptainData } from '../contexts/CaptainContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { socketContext } from '../contexts/SocketContext';
import { useEffect } from 'react';

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);
  const {setCaptain, captain} = useCaptainData();
  const navigate = useNavigate();
  const {socket} = useContext(socketContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  useEffect(() => {
    if (!captain || !socket) return;
    console.log('Captain available in CaptainHome:', captain);
    socket.emit("join", { userType: "captain", userId: captain._id });


    const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

  }, [captain, socket]); // Added proper dependency array

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0%)",
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0%)",
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [confirmRidePopupPanel])

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 201) {
        setCaptain(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/captain-login");
      }
    } catch (error) {
      console.error(error);
      alert('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col relative bg-white rounded-t-2xl overflow-hidden">
      <div className="flex justify-between items-center absolute w-full p-4 z-10">
        <img
          className="w-12"
          src="https://cdn-icons-png.flaticon.com/128/5969/5969183.png"
          alt="ride icon"
        />
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center gap-2 bg-white px-4 py-2 rounded-full transition-colors ${
            isLoggingOut ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-100 active:bg-gray-200'
          }`}
        >
          {isLoggingOut ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
          ) : (
            <>
              <i className="ri-logout-box-r-line text-xl"></i>
              <span>Logout</span>
            </>
          )}
        </button>
      </div>

      <div className="h-[75%] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gjBf1FfBqt8CfC2GaDdvtNUtCDmsHeTKaw&s"
          alt="ride"
        />
      </div>

      {/* Driver Info Section */}


      <div className='rounded-t-2xl'>
        <CaptainDetails />

      </div>


      <div ref={ridePopupPanelRef} className="fixed bottom-0 translate-y-0 z-10 w-full rounded-t-2xl bg-white">
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>


      <div ref={confirmRidePopupPanelRef} className="fixed bottom-0 translate-y-0 z-10 w-full rounded-t-2xl bg-white">
        <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;