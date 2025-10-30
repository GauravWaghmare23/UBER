import React from 'react';

const locations = [
  'Plot No. 162/4, near Chandigarh Petrol Pump, Chandigarh',
  'SCO 21, Sector 8-C, near Gopal Sweets, Chandigarh',
  'Booth No. 45, Sector 15-D, near Punjab University, Chandigarh',
  'Elante Mall, Industrial Area Phase 1, Chandigarh',
  'Bay Shop 3, Sector 17 Plaza, Chandigarh',
  'Phase 3B2, near KFC, Mohali',
];

const LocationSearchPanel = (props) => {
  return (
    <div className="flex flex-col gap-4">
      {locations.map((location, index) => (
        <div
          onClick={()=>{
            props.setVehiclePanel(true)
            props.setOpenToggle(false)
          }}
          key={index}
          className="flex gap-4 border-2 border-transparent active:border-black rounded-2xl px-2 py-1 items-center justify-start mx-5 transition-colors duration-200"
        >
          <div className="bg-gray-200 px-3 py-2 rounded-xl">
            <i className="ri-map-pin-fill"></i>
          </div>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;