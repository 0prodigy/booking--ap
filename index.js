const express = require("express");
const mongoose = require("mongoose");
const Driver = require("./driver");
const Rider = require("./rider");
mongoose.connect("mongodb://localhost:27017/local", (err) => {
  if (!err) {
    console.log("Mongoose is connected");
  }
});

const app = express();

app.use(express.json());

// register a driver
app.post("/driver/register", async (req, res) => {
  const { name, license_number, phone, cab, current_coordinates } = req.body;
  const driver = new Driver({
    name,
    license_number,
    cab,
    current_coordinates,
    is_available: true,
    booked: false,
    phone,
  });
  try {
    driver.save((err, driver) => {
      if (!err) {
        return res.json(driver);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// register a rider
app.post("/rider/register", async (req, res) => {
  const { name, phone, coordinates } = req.body;
  const rider = new Rider({
    name,
    current_coordinates: coordinates,
    phone,
  });
  try {
    rider.save((err, rider) => {
      if (!err) {
        return res.json(rider);
      }
      console.log(err);
      throw err;
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// get a cab
app.get("/cab", async (req, res) => {
  // ?coordinate=49:10
  const { coordinates } = req.query;
  let [x, y] = coordinates.split(":");
  let drivers = await Driver.find({
    is_available: true,
    booked: false,
  });

  drivers = drivers.filter((driver) => {
    let d_c = driver.current_coordinates;
    let diff = Math.sqrt(Math.abs(d_c.x - x) ** 2 + Math.abs(d_c.y - y) ** 2);
    if (diff <= driver.cab?.threshold_distance) {
      return true;
    }
    return false;
  });
  return res.json({ drivers });
});

// update availability
app.patch("/driver/:id/availability", async (req, res) => {
  const { id } = req.params;
  const { coordinates } = req.body;

  const driver = await Driver.findOne({ _id: id });

  if (driver) {
    await driver
      .updateOne({
        is_available: !driver.is_available,
        current_coordinates: coordinates || driver.current_coordinates,
      })
      .then((err, driver) => {});
  } else {
    return res.status(404).json({ msg: "Driver not found" });
  }
  return res.json({ msg: "Updated successfully", driver });
});

// book a cap

app.post("/book", async (req, res) => {
  const { driver_id, rider_id } = req.body;

  const driver = await Driver.findOne({
    _id: driver_id,
    is_available: true,
    booked: false,
  });
  if (driver) {
    console.log(driver);
    driver
      .updateOne({ booked: true, booked_client: rider_id })
      .then((err, driver) => {
        console.log(err, driver);
      });
  } else {
    return res.status(404).json({ msg: "Driver not found" });
  }
  return res.json({ msg: "Booked successfully" });
});

app.listen(8000, (err) => {
  if (!err) {
    console.log("Server is running on 8000");
  }
});
