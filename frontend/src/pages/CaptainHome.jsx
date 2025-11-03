import React, { useRef, useState } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);

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

  return (
    <div className="h-screen w-screen flex flex-col relative bg-white rounded-t-2xl overflow-hidden">
      <img
        className="w-12 absolute top-4 left-4 z-10"
        src="https://cdn-icons-png.flaticon.com/128/5969/5969183.png"
        alt="ride icon"
      />

      <i className="ri-logout-box-r-line px-2 py-1 absolute top-4 right-4 bg-white rounded-full"></i>

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