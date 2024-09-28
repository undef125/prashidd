const User = require("../models/Schema/User");
const Event = require("../models/Schema/Event");
const { HUNTER_API } = require("../config");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Schema/Admin");
const cosineSimilarity = require("cosine-similarity");
const natural = require("natural");

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
    const token = jwt.sign(
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
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
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

    const token = jwt.sign(
      {
        id: admin._id,
      },
      "ac0edd353a2e52316dec466b12843b5facbc6467408d71325a9562876934aa88",
      { expiresIn: "5h" }
    );
    return res
      .status(200)
      .cookie("adminToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2, // 2hrs
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
    const users = await User.find().select("name gender email batch");
    if (users.length !== 0) {
      res.json({ status: "okay", data: users });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: "error deleting user" });
  }
};
const getSingleUser = async (req, res) => {
  console.log("here I am");
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: "okay", data: user });
  } catch (error) {
    return res.status(500).json({ message: "error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: req.body,
    });
    console.log(updatedUser);
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: "error fetching user" });
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty value and a past expiration date
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
        secure: true, // Ensures the cookie is sent only over HTTPS
        sameSite: "None", // Necessary for cross-site requests
      })
      .json({ status: "ok", message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};

const getAppliedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const eventsApplied = await Event.find({
      appliedBy: {
        $eq: userId,
      },
    });
    console.log("------------------------------", eventsApplied);
    console.log("------------------------------");
    return res.status(200).send(eventsApplied);
  } catch (error) {
    console.error(error.message);
  }
};

const recommendedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const eventsApplied = await Event.find({
      appliedBy: {
        $eq: userId,
      },
    });
    const appliedEventText = eventsApplied
      .map((event) => {
        return event.description;
      })
      .join(" ");

    const userInterest = user.interestedIn.join(" ") || "";
    const tokenizer = new natural.WordTokenizer();
    const userHistroy = `${userInterest} ${appliedEventText}`.trim();

    const allEvents = await Event.find();
    const userToken = tokenizer.tokenize(userHistroy);
    const similarEventsForUser = allEvents.map((event) => {
      const eventTokens = tokenizer.tokenize(event.description);

      const userFreqVector = createTermFrequencyVector(userToken, eventTokens);
      const eventFreqVector = createTermFrequencyVector(eventTokens, userToken);

      const similarityScore = cosineSimilarity(userFreqVector, eventFreqVector);

      return { event, similarityScore };
    });

    console.log(similarEventsForUser);

    const sortedEvents = similarEventsForUser
      .filter((event) => event.similarityScore > 0.4)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 5);

    return res.status(200).json({
      success: true,
      data: sortedEvents,
    });
  } catch (error) {
    console.error(error);
  }
};

const createTermFrequencyVector = (tokensA, tokensB) => {
  const allTokens = Array.from(new Set([...tokensA, ...tokensB]));
  const freqVector = allTokens.map(
    (token) => tokensA.filter((t) => t === token).length
  );
  return freqVector;
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  removeUser,
  getSingleUser,
  updateUser,
  logoutUser,
  getAppliedEvents,
  recommendedEvents,
};
