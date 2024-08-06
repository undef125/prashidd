const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true},
    date: { type: Date, required: true },
    time:{ type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
