import React from 'react';
import { useCaptainData } from '../contexts/CaptainContext';

const CaptainDetails = () => {
  const {captain} = useCaptainData();
  if (!captain) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full rounded-t-2xl px-4 pt-8 pb-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="driver"
          />
          <div>
            <h1 className="text-xl font-semibold">{captain.fullName.firstName} {captain.fullName.lastName}</h1>
            <p className="text-xs text-gray-500">Basic Level</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">₹ 5000</h2>
          <p className="text-xs text-gray-500">Total Earnings</p>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="mt-4 w-full bg-yellow-500 rounded-2xl py-8 px-4 flex justify-between items-center">
        <div className="flex flex-col items-center">
          <i className="ri-time-line ri-xl"></i>
          <p className="text-sm font-semibold mt-2">10.2</p>
          <p className="text-xs text-gray-700">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-dashboard-3-line ri-xl"></i>
          <p className="text-sm font-semibold mt-2">25.6 km</p>
          <p className="text-xs text-gray-700">Total Distance</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-roadster-line ri-xl"></i>
          <p className="text-sm font-semibold mt-2">54</p>
          <p className="text-xs text-gray-700">Trips Completed</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;