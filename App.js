import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TravelForm from './components/TravelForm';
import TripList from './components/TripList';
import AIChat from './components/AIChat';
import LandingPage from './components/LandingPage';
import SignIn from './components/Sign';
import SignUp from './components/SignUp';
import TripPage from './components/TripPage';
import './App.css';

function App() {
  const [trips, setTrips] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTrips, setShowTrips] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/trips');
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []); // Fetch trips on component mount

  const addTrip = async (newTrip) => {
    try {
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrip),
      });

      if (response.ok) {
        await fetchTrips(); // Fetch latest data after adding
      }
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${updatedTrip._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTrip),
      });

      if (response.ok) {
        await fetchTrips(); // Fetch latest data after updating
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/trips/${id}`, { method: 'DELETE' });
      await fetchTrips(); // Fetch latest data after deleting
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route
            path="/planner"
            element={
              isAuthenticated ? (
                <>
                  <button onClick={() => setShowTrips(!showTrips)}>
                    {showTrips ? 'Back to Planner' : 'My Trips'}
                  </button>
                  {showTrips ? (
                    <TripList
                      trips={trips}
                      onSelectTrip={setSelectedTrip}
                      onDeleteTrip={deleteTrip}
                      onUpdateTrip={updateTrip}
                    />
                  ) : (
                    <>
                      <TravelForm addTrip={addTrip} />
                      <button onClick={() => setShowAIChat(!showAIChat)}>
                        {showAIChat ? 'Hide AI Chat' : 'Show AI Chat'}
                      </button>
                      {showAIChat && <AIChat />}
                    </>
                  )}
                  {selectedTrip && (
                    <button onClick={() => setShowTrips(true)}>See Your Plan</button>
                  )}
                  {selectedTrip && !showTrips && (
                    <div>
                      <h3>Your Trip Plan:</h3>
                      <p>Destination: {selectedTrip.destination}</p>
                      <p>Budget: {selectedTrip.budget}</p>
                      <p>Start Date: {selectedTrip.startDate}</p>
                      <p>End Date: {selectedTrip.endDate}</p>
                    </div>
                  )}
                </>
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/trip/:id" element={<TripPage trips={trips} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
