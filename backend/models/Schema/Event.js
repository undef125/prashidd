const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String },
    location: { type: String },
    image: { type: String },
    date: { type: Date },
    time: { type: String },
    category: { type: String },
    description: { type: String },
    appliedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
        },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        sentiment: {
          type: String,
          // enum: ["positive", "negative", "neutral"],
          default: "neutral",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
