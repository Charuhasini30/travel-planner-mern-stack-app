import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; 

function LandingPage() {
  const navigate = useNavigate();

  const startTrip = () => {
    navigate('/signin'); 
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Travel Planner</h1>
      <button onClick={startTrip} className="start-trip-btn">
        Start Trip
      </button>
    </div>
  );
}

export default LandingPage;
