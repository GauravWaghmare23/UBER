import React, { useRef, useState } from "react";
import UserLogout from "../components/UserLogout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { useContext } from "react";
import { socketContext } from "../contexts/SocketContext";
import { useEffect } from "react";
import { useUserData } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [openToggle, setOpenToggle] = useState(false);
  const usePanel = useRef(null);
  const panelClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [lookingDriverPanel, setLookingDriverPanel] = useState(false);
  const lookingDriverRef = useRef(null);
  const [waitingDriverPanel, setWaitingDriverPanel] = useState(false);
  const waitingDriverRef = useRef(null);
  const [fares, setFares] = useState({});
  const [vehicle, setVehicle] = useState("");
  const [selectedFare, setSelectedFare] = useState("loading..");
  const navigate = useNavigate();
  const {socket} = useContext(socketContext);
  const {user,setUser} = useUserData();


  useEffect(() => {
    if (!user || !socket) return;
    
    const connectSocket = async () => {
      try {
        // Ensure socket is connected
        if (!socket.connected) {
          await socket.connect();
        }
        
        // Join user to socket room
        socket.emit("join", { userType: "user", userId: user._id });
      } catch (error) {
        console.error('Socket connection error:', error);
      }
    };

    connectSocket();

    // Cleanup function
    return () => {
      try {
        if (socket && socket.connected) {
          socket.emit('user_disconnect');
          socket.disconnect();
        }
      } catch (error) {
        console.error('Socket cleanup error:', error);
      }
    };
  }, [socket, user]);

  const pickSuggestionHandler = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/maps/get-suggestions`,
        { params: { input: e.target.value }, withCredentials: true }
      );

      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const destSuggestionHandler = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/maps/get-suggestions`,
        { params: { input: e.target.value }, withCredentials: true }
      );

      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVehiclePanel(true);
    setOpenToggle(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/maps/get-distance-time-fare`,
        {
          params: {
            origin: pickup,
            destination: destination,
          },
          withCredentials: true,
        }
      );

      setFares(response.data.fares);
    } catch (error) {
      console.error("Error fetching fares and distance:", error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rides/create`,
        {
          pickup: pickup,
          destination: destination,
          vehicleType: vehicle,
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  // --- GSAP Animation Hooks ---

  // Animate Location Search Panel
  useGSAP(
    function () {
      if (openToggle) {
        gsap.to(usePanel.current, {
          height: "70%",
        });
        gsap.to(panelClose.current, {
          opacity: 1,
        });
      } else {
        gsap.to(usePanel.current, {
          height: "0%",
        });
        gsap.to(panelClose.current, {
          opacity: 0,
        });
      }
    },
    [openToggle]
  ); // Removed panelClose from dependency array

  // Animate Vehicle Panel
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  ); // Removed vehiclePanelRef from dependency array

  // Animate Confirm Ride Panel
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // Animate Looking For Driver Panel
  useGSAP(
    function () {
      if (lookingDriverPanel) {
        gsap.to(lookingDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingDriverPanel]
  );

  // Animate Waiting For Driver Panel
  useGSAP(
    function () {
      if (waitingDriverPanel) {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingDriverPanel]
  ); // Removed waitingDriverRef from dependency array

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const handleLogout = async () => {
        if (isLoggingOut) return; // Prevent double-clicks
        
        try {
            setIsLoggingOut(true);
            
            // Clear local storage first
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            // Disconnect socket before logout
            if (socket && socket.connected) {
                try {
                    socket.emit('user_disconnect');
                    socket.disconnect();
                } catch (socketError) {
                    console.error('Socket disconnect error:', socketError);
                }
            }

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
                withCredentials: true
            });

            if (response.status === 201 || response.status === 200) {
                // Clear all states
                setPickup("");
                setDestination("");
                setVehiclePanel(false);
                setConfirmRidePanel(false);
                setLookingDriverPanel(false);
                setWaitingDriverPanel(false);
                
                // Clear user context
                setUser(null);
                
                // Navigate to login page
                navigate("/user-login", { replace: true });
            } else {
                throw new Error('Logout failed: Unexpected response status');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Restore token if logout failed
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.setItem("token", user?.token || "");
                localStorage.setItem("role", "user");
            }
            const errorMessage = error.response?.data?.message || 'Failed to logout. Please try again.';
            alert(errorMessage);
        } finally {
            setIsLoggingOut(false);
        }
    }

  // --- Component JSX ---
  return (
    <div className="h-screen w-screen relative overflow-hidden rounded-t-2xl">
      <div className="flex justify-between items-center absolute w-full p-4 z-10">
        <img
          className="w-20"
          src="https://cdn-icons-png.flaticon.com/128/5969/5969183.png"
          alt="Logo"
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
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gjBf1FfBqt8CfC2GaDdvtNUtCDmsHeTKaw&s"
          alt=""
        />
      </div>
      <div className="h-screen w-full flex flex-col justify-end fixed top-0 z-10">
        <div className="relative bg-white w-full p-4 shadow-lg transition-all duration-300">
          <button
            ref={panelClose}
            onClick={() => setOpenToggle(false)}
            className="absolute right-5 top-2 opacity-0 transition-opacity duration-200 hover:opacity-75"
            aria-label="Close panel"
          >
            <i className="ri-close-line text-3xl"></i>
          </button>
          <h2 className="text-2xl font-semibold py-2 mb-4">Where to?</h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-4"
          >
            <input
              onClick={() => {
                setOpenToggle(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => {
                pickSuggestionHandler(e);
              }}
              className="w-full focus:outline-none focus:ring-2 focus:ring-black px-4 py-3 mb-6 bg-gray-200 rounded-lg"
              type="text"
              placeholder="Enter your pick-up location"
            />
            <input
              onClick={() => {
                setOpenToggle(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                destSuggestionHandler(e);
              }}
              className="w-full focus:outline-none focus:ring-2 focus:ring-black px-4 py-3 mb-6 bg-gray-200 rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              type="submit"
              className="w-full bg-black rounded-2xl text-xl text-white px-4 py-3"
            >
              Find a ride
            </button>
          </form>
        </div>
        <div ref={usePanel} className="bg-white w-full pt-4">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setVehiclePanel={setVehiclePanel}
            setOpenToggle={setOpenToggle}
            setDestination={setDestination}
            setPickup={setPickup}
            setPickupSuggestions={setPickupSuggestions}
            setDestinationSuggestions={setDestinationSuggestions}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Panel - Has 'translate-y-full' */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 z-10 rounded-t-2xl translate-y-full w-full bg-white px-4 py-3"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fares={fares}
          setVehicle={setVehicle}
          vehicle={vehicle}
          setSelectedFare={setSelectedFare}
        />
      </div>

      {/* FIX: Confirm Ride Panel - Added 'translate-y-full' */}
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 z-10 translate-y-full rounded-t-2xl w-full bg-white"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setLookingDriverPanel={setLookingDriverPanel}
          pickup={pickup}
          destination={destination}
          selectedFare={selectedFare}
          createRide={createRide}
        />
      </div>

      {/* FIX: Looking For Driver Panel - Added 'translate-y-full' */}
      <div
        ref={lookingDriverRef}
        className="fixed bottom-0 translate-y-full w-full bg-white"
      >
        <LookingForDriver
          setLookingDriverPanel={setLookingDriverPanel}
          pickup={pickup}
          destination={destination}
          selectedFare={selectedFare}
        />
      </div>

      {/* Waiting For Driver Panel - Missing 'translate-y-full' but has correct GSAP. Added 'translate-y-full' for consistency/safety */}
      <div
        ref={waitingDriverRef}
        className="fixed bottom-0 z-10 translate-y-full rounded-t-2xl w-full bg-white"
      >
        <WaitingForDriver setWaitingDriverPanel={setWaitingDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
