const express = require("express");
const bodyParser = require("body-parser");
const { HUNTER_API } = require("./config");
const PORT = 5000;
const axios = require("axios");
// import DBconnection from "../conn"
// import User from "./models/Schema/User";
const User = require("./models/Schema/User");
const Event = require("./models/Schema/Event");
const DBconnection = require("./conn");
const bcrypt = require("bcrypt");
const cors = require("cors");
const upload = require("../backend/middleware/multer");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./images"));

//hunter API verfiy for testing

const verifyemail = async (email) => {
  console.log(email, HUNTER_API);
  try {
    const result = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${HUNTER_API}`
    );
    console.log("-------------------------------------------");
    console.log(result.data.data.status);
    console.log("-------------------------------------------");
    return result.data.data.status === "valid";
  } catch (error) {
    console.error(error);
  }
  return false;
};

//register API
app.post("/register", async (req, res) => {
  console.log("Register");
  const { name, email, password, batch, interestedIn, gender } = req.body;

  try {
    const isValidEmail = await verifyemail(email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      batch,
      interestedIn,
      gender,
    });
    console.log(user);

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
  }
});

//login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.json({ message: "User logged in successfully", status: "ok" });
  } catch (error) {}
});

//API to add events
app.post("/addevent", upload.single("image"), async (req, res) => {
  const { eventName, location, date, time, category, description } = req.body;
  try {
    req.body.image = `http://localhost:5000/${req.file.filename}`;
    console.log(req.body)
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    console.error(error);
  }
});

//API to get all events
app.get("/getevents", async (req,res)=>{
  try{
    const events = await Event.find({});
    res.json({messages: "events available", data: events});
  }catch (error){
    console.error(error);
  }
})

//API to get single event
app.get("/getevent/:id", async (req, res) => {
  console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event found", data: event });
  } catch (error) {
    console.error(error);g
  }
})

DBconnection();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
