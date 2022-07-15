const mongoose = require("mongoose");

const driver = mongoose.Schema({
  name: { type: String },
  license_number: { type: String },
  is_available: { type: Boolean },
  phone: { type: String },
  booked: { type: Boolean },
  cab: {
    model: { type: String },
    threshold_distance: { type: Number },
  }, // this is to make one-to-one relationship with cab eg: driver is not available so will cab
  current_coordinates: {
    x: Number,
    y: Number,
  },
  booked_client: { type: String },
});

module.exports = mongoose.model("driver", driver);

// interface Driver {
//     id: number;
//     name: string;
//     license_number: string;
//     is_available : boolean;
//     booked: boolean;
//     cab: Cab;  // this is to make one-to-one relationship with cab eg: driver is not available so will cab
//     current_coordinates: Location;
// }

// interface Location {
//     x: number;
//     y: number;
// }

// interface Cab {
//     id: string;
//     model: string;
//     threshold_distance: number
// }

// interface Rider {
//     id: number;
//     phone: number;
//     current_coordinates: Location
// }
