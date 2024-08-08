const User = require("../models/Schema/User");
const { HUNTER_API } = require("../config");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

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
        message: "Logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
