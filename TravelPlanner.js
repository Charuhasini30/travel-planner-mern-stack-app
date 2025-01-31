import React, { useState } from 'react';
import Header from './Header';

function TravelPlanner() {
  const [destination, setDestination] = useState("");

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleAddDestination = () => {
    alert(`Destination Added: ${destination}`);
    setDestination(""); // Clear the input after adding
  };

  return (
    <div className="travel-planner">
      <Header />
      <h2>Plan Your Trip</h2>
      <input 
        type="text" 
        value={destination} 
        onChange={handleDestinationChange} 
        placeholder="Add Destination" 
        className="destination-input"
      />
      <button onClick={handleAddDestination} className="add-destination-btn">
        Add Destination
      </button>
    </div>
  );
}

export default TravelPlanner;
