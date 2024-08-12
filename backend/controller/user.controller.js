const User = require("../models/Schema/User");
const { HUNTER_API } = require("../config");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../models/Schema/Event");
const Admin = require("../models/Schema/Admin");
const Contact = require("../models/Schema/Contact");

const verifyemail = async (email) => {
  console.log(email, HUNTER_API);
  try {
    const result = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${HUNTER_API}`
    );

    return result.data.data.status === "valid";
  } catch (error) {
    console.error(error);
  }
  return false;
};

const registerUser = async (req, res) => {
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
};

const loginUser = async (req, res) => {
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
    const token = await jwt.sign(
      {
        id: user._id,
      },
      "myjwtsecrectisverygoodandyoucantdecrytpit",
      { expiresIn: "5h" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 900000, // 15 minutes
        secure: true, // Ensures the cookie is sent only over HTTPS
        sameSite: "None", // Necessary for cross-site requests
      })
      .json({
        status: "ok",
        message: "Logged in successfully",
        token: token,
        userId: user._id,
      });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const token = await jwt.sign(
      {
        id: admin._id,
      },
      "myjwtsecrectisverygoodandyoucantdecrytpit",
      { expiresIn: "5h" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 900000, // 15 minutes
        secure: true, // Ensures the cookie is sent only over HTTPS
        sameSite: "None", // Necessary for cross-site requests
      })
      .json({
        status: "ok",
        message: "Logged in successfully",
        token: token,
        adminId: admin._id,
      });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length !== 0) {
      res.json({ status: "okay", data: users });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const postQuery = async (req, res) => {
  try {
    // const { userName, userEmail, userMessage } = req.body;
    const newContact = new Contact({
      ...req.body,
    });
    const query = await newContact.save();
    res.status(200).json({ message: "Query added", data: query });
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

const getQuery = async (req, res) => {
  try {
    const query = await Contact.find();
    res.status(200).json({ message: "Query Fetched", data: query });
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  postQuery,
  getQuery,
};
