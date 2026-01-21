const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentimentScore: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

mongoose.model("Message", MessageSchema);
