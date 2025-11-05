import React from 'react';


const LocationSearchPanel = ({
  suggestions,
  setDestination,
  setPickup,
  activeField,
}) => {
  const handleSuggestionCLick = (location) => {
    if (activeField === 'pickup') {
      setPickup(location.description);
    } else if (activeField === 'destination') {
      setDestination(location.description);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {suggestions.map((location, index) => (
        <div
          onClick={() => {
            handleSuggestionCLick(location);
          }}
          key={index} // Note: Using index as a key is not ideal if the list can change. Use location.place_id if available.
          className="flex gap-4 border-2 border-transparent active:border-black rounded-2xl px-2 py-1 items-center justify-start mx-5 transition-colors duration-200"
        >
          <div className="bg-gray-200 px-3 py-2 rounded-xl">
            <i className="ri-map-pin-fill"></i>
          </div>
          
          {/* ✅ THE FIX IS HERE 👇 */}
          <h4 className="font-medium">{location.description}</h4>
          
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;