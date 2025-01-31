const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1); 
    });

const Trip = require('./models/Trip'); 

// Create a trip
app.post('/api/trips', async (req, res) => {
  const { destination, startDate, endDate, budget } = req.body;

  if (!destination || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newTrip = new Trip({
      destination,
      startDate,
      endDate,
      budget
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip created!', trip: newTrip });
  } catch (err) {
    console.error('Error creating trip:', err.message); 
    res.status(500).json({ message: 'Error creating trip', error: err.message });
  }
});

// Get all trips
app.get('/api/trips', async (req, res) => {
  try {
    const trips = await Trip.find(); 
    res.status(200).json(trips); 
  } catch (err) {
    console.error('Error fetching trips:', err.message);
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
});

// Update a trip by ID
app.put('/api/trips/:id', async (req, res) => {
  const { destination, startDate, endDate, budget } = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id, 
      { destination, startDate, endDate, budget },
      { new: true } // return the updated trip
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(updatedTrip);
  } catch (err) {
    console.error('Error updating trip:', err.message);
    res.status(500).json({ message: 'Error updating trip', error: err.message });
  }
});

// Delete a trip by ID
app.delete('/api/trips/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error deleting trip:', err.message);
    res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
});

// Server listening on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
