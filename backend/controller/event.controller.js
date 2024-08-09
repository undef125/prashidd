const Event = require("../models/Schema/Event");

const addEvent = async (req, res) => {
  const { eventName, location, date, time, category, description } = req.body;
  try {
    req.body.image = `http://localhost:5000/${req.file.filename}`;
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json({ messages: "events available", data: events });
  } catch (error) {
    console.error(error);
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event found", data: event });
  } catch (error) {
    console.error(error);
  }
};

const applyForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { appliedBy: req.userId } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Applied successfully", updatedEvent });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};
const addComment = async (req, res) => {
  console.log("API called");
  console.log(req.body);
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          comments: {
            comment: req.body.comment,
            by: req.userId,
          },
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Added comment successfully", updatedEvent });
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  getSingleEvent,
  applyForEvent,
  addComment,
};
