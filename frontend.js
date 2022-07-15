const axios = require("axios");

const registerDriver = () => {
  axios
    .post("http://localhost:8000/driver/register", {
      name: "Johnette",
      phone: "116-534-0099",
      license_number: "bdc55225-7b37-45b0-8ccf-43fd5264982e",
      is_available: false,
      booked: true,
      cab: {
        model: "x-suv",
        threshold_distance: 40,
      },
      current_coordinates: {
        x: 34,
        y: 78,
      },
    })
    .then((res) => res.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
};

const registerRider = () => {
  axios
    .post("http://localhost:8000/rider/register", {
      name: "Krystalle",
      phone: "373-931-7343",
      current_coordinates: {
        x: 34,
        y: 68,
      },
    })
    .then((res) => res.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
};

const getCabs = () => {
  axios
    .get("http://localhost:8000/cab?coordinates=74:90")
    .then((res) => res.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
};

const updateAvailability = (id) => {
  axios
    .patch(`http://localhost:8000/driver/${id}/availability`, {
      coordinates: {
        x: 54,
        y: 64,
      },
    })
    .then((res) => res.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
};

const book = (rider, driver) => {
  axios
    .post(`http://localhost:8000/book`, {
      rider_id: rider,
      driver_id: driver,
    })
    .then((res) => res.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data));
};

// getCabs();
// registerDriver();
// registerRider();
updateAvailability("62d1276e7fed93b2cc545d92");
// book("62d1228c3f6379d797611dd2", "62d1276e7fed93b2cc545d92");
