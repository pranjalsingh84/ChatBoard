// Load environment variables first
require("dotenv").config();

// Import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",        // allow all for now
  credentials: true
}));

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log("Mongoose connection ERROR:", err.message));

// Bring in models
require("./models/User");
require("./models/Channel");
require("./models/Message");

// Bring in routes
const voiceRoutes = require("./routes/voice");
app.use("/api", voiceRoutes);
app.use("/user", require("./routes/user"));
app.use("/channel", require("./routes/channel"));
app.use("/messages", require("./routes/messages"));

// Error handlers
app.use(errorHandler.notFound);
app.use(errorHandler.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandler.developmentErrors);
} else {
  app.use(errorHandler.productionErrors);
}

// Start server (IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// Initialize socket.io
const sockets = require("./sockets");
sockets.init(server);
