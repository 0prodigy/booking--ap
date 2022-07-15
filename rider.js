const mongoose = require("mongoose");

const rider = mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  current_coordinates: {
    x: Number,
    y: Number,
  },
});

module.exports = mongoose.model("rider", rider);
