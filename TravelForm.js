import React, { useState } from 'react';

const TravelForm = ({ addTrip }) => {
  const [destination, setDestination] = useState('');
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const placesByDestination = {
    Ooty: ['Ooty Lake', 'Botanical Garden', 'Doddabetta Peak'],
    Paris: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
    Scotland: ['Edinburgh Castle', 'Stirling Castle', 'Loch Ness'],
    London: ['Buckingham Palace', 'Big Ben', 'Tower of London', 'British Museum'],
    Greece: ['Oia Village', 'Red Beach', 'Akrotiri', 'Fira Town'],
    Peru: ['Sun Gate', 'Temple of the Sun', 'Inca Bridge', 'Huayna Picchu'],
    Egypt: ['Pyramids of Giza', 'Sphinx', 'Egyptian Museum', 'Khan El Khalil'],
  };

  const handleDestinationChange = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
    setTouristPlaces(placesByDestination[selectedDestination] || []);
    setSelectedPlace('');
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Today's date in yyyy-mm-dd format

    if (selectedStartDate < today) {
      alert("You cannot select a previous date. Please select today's date or a future date.");
      setStartDate(''); // Clear the start date if it's invalid
      return;
    }

    setStartDate(selectedStartDate);
  };

  const handleAddTrip = () => {
    if (!destination || !selectedPlace || !budget || !startDate || !endDate) {
      alert('Please fill in all fields');
      return;
    }
    

    const newTrip = {
      destination,
      place: selectedPlace,
      startDate,
      endDate,
      budget,
    };

    addTrip(newTrip); // Passing the new trip to the parent component
    // Clear the form fields after adding the trip
    setDestination('');
    setSelectedPlace('');
    setBudget('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="travel-form">
      <h2>Plan Your Trip</h2>

      <label>
        Destination:
        <select value={destination} onChange={handleDestinationChange}>
          <option value="">Select a Destination</option>
          {Object.keys(placesByDestination).map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </label>

      {destination && (
        <label>
          Tourist Place:
          <select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
            <option value="">Select a Tourist Place</option>
            {touristPlaces.map((place, index) => (
              <option key={index} value={place}>
                {place}
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        Budget:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </label>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}  // Using the custom handler for start date change
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate} // Ensures the end date is not before the start date
        />
      </label>

      <button onClick={handleAddTrip}>Add Trip</button>

      {/* Add the style here */}
      <style jsx>{`
        .travel-form {
          background-color: #f7f7f7;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: auto;
        }
        
        h2 {
          text-align: center;
          color: #4f4f4f;
        }

        label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }

        select,
        input[type="number"],
        input[type="date"] {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: #f1f1f1;
          font-size: 14px;
        }

        button {
          background-color: #5cb85c;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #4cae4c;
        }
      `}</style>
    </div>
  );
};

export default TravelForm;
