const mongoose = require("mongoose");

// Connect to MongoDB

const DBconnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/eventdb", {
      useUnifiedTopology: true,
    })
    .then((data) => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
};
module.exports = DBconnection;
