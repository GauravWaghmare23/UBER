import React, { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";

// Renamed to better reflect its new purpose, but you can keep CaptainRiding
const CaptainInProgress = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const naviagte = useNavigate();

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen w-screen flex flex-col relative bg-white overflow-hidden">
      {/* Top Icons */}
      <img
        className="w-12 absolute top-4 left-4 z-10"
        src="https://cdn-icons-png.flaticon.com/128/5969/5969183.png"
        alt="ride icon"
      />
      <i className="ri-logout-box-r-line px-2 py-1 absolute top-4 right-4 bg-white rounded-full z-10 cursor-pointer"></i>

      {/* Map Image */}
      <div className="h-[80%] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gjBf1FfBqt8CfC2GaDdvtNUtCDmsHeTKaw&s"
          alt="map route"
        />
      </div>

      {/* Ride Details & Complete Button Area */}
      <div className="w-full px-6 py-4 flex flex-col justify-between items-center bg-white rounded-t-2xl -mt-4 z-10">
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <i class="ri-arrow-up-s-line ri-xl text-4xl"></i>
        </button>
        <div className="w-full">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">Heading to Drop-off</h2>
            <p className="text-lg text-blue-600 font-medium">4km away</p>
          </div>
        </div>

        {/* Replaced buttons with "Complete Ride" */}
        <button
          onClick={() => {
            naviagte("/captain-home");
          }}
          className="text-xl w-full mt-6 font-medium bg-red-500 text-white px-4 py-3 rounded-xl"
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 translate-y-0 z-10 w-full bg-white rounded-t-2xl"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainInProgress;
