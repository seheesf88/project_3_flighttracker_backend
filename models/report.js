const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  flightNum: {type: String},
  airline: {type: String},
  date: {type: String},
  estDeparture: {type: String},
  estArrival: {type: String},
  status: {type: String},
  issue: {type: String},

  // WE CAN CHANGE OR ADD MORE THIS IF WE NEED TO! FOR NOW I JUST FILLED UP

});

module.exports = mongoose.model('Report', reportSchema)
