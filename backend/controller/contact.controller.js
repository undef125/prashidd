const Contact = require("../models/Schema/Contact");

const postQuery = async (req, res) => {
  try {
    // const { userName, userEmail, userMessage } = req.body;
    const newContact = new Contact({
      ...req.body,
    });
    console.log(newContact);
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

const removeQuery = async (req, res) => {
  try {
    const queryId = req.params.queryId;
    const user = await Contact.findByIdAndDelete(queryId);
    return res
      .status(200)
      .json({ message: "Query deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: "error deleting query" });
  }
};

module.exports = { postQuery, getQuery, removeQuery };
