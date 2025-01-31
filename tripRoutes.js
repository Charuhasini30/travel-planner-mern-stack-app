const express = require('express');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a trip
router.post('/create', authMiddleware, async (req, res) => {
    const { destination, startDate, endDate, budget } = req.body;

    try {
        const newTrip = new Trip({ user: req.user.id, destination, startDate, endDate, budget });
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get user trips
router.get('/mytrips', authMiddleware, async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
router.put('/update/:id', authMiddleware, async (req, res) => {
    const { destination, startDate, endDate, budget } = req.body;

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Ensure the user owns the trip
            { destination, startDate, endDate, budget },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.json(updatedTrip);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
router.delete('/trips/:id', authMiddleware, async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});



module.exports = router;
