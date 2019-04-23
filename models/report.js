const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  flightNum: {type: String},
  airline: {type: String},
  date: {type: String},
  estDeparture: {type: String},
  estArrival: {type: String},
  status: {type: String},
  issue: {type: String},
});

module.exports = mongoose.model('Report', reportSchema)
