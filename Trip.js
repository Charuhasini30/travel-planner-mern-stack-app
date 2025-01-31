const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination:  String,
  startDate: Date,
  endDate:  Date,
  budget:  Number, 
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
