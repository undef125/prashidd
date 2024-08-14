const Event = require("../models/Schema/Event");
const User = require("../models/Schema/User");
const { spawn } = require("child_process");

function runPythonScript(text) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["./controller/sentiment.py", text], {
      stdio: ["inherit", "pipe", "pipe"], // inherit stdin, capture stdout and stderr
      env: {
        ...process.env,
        PYTHONWARNINGS: "ignore", // suppress Python warnings
      },
    });

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}. Error: ${error}`);
      } else {
        resolve(result.trim());
      }
    });
  });
}

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
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.json({ messages: "events available", data: events });
  } catch (error) {
    console.error(error);
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate({
      path: "comments.by",
      select: "name",
    });
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
  try {
    const { eventId } = req.params;
    console.log(req.body);
    let sentiment = "";
    runPythonScript(req.body.comment)
      .then(async (output) => {
        sentiment = output.split(" ")[1];
        console.log("Sentiment Analysis Result:", output.split(" ")[1]);
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          {
            $push: {
              comments: {
                comment: req.body.comment,
                by: req.userId,
                sentiment: output.split(" ")[1],
              },
            },
          },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "Added comment successfully", updatedEvent });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    // const sentiment =
  } catch (error) {
    return res.status(500).json({ message: "error: " + error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  // console.log(eventId);
  try {
    const event = await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Successfully deleted!", success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  getSingleEvent,
  applyForEvent,
  addComment,
  deleteEvent,
};
