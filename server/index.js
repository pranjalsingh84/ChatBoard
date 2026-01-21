// Load environment variables first
require("dotenv").config();

// Import core modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import error handler
const errorHandler = require("./handlers/errorHandler");

// Initialize app
const app = express();

// ---------------- MIDDLEWARES ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",   // frontend allow (later restrict kar sakte ho)
    credentials: true,
  })
);

// ---------------- CONNECT MONGODB ----------------
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to database."))
  .catch((err) => console.log("❌ MongoDB connection ERROR:", err.message));

// ---------------- LOAD MODELS (VERY IMPORTANT ORDER) ----------------
require("./models/User");
require("./models/Channel");
require("./models/Message");

// ---------------- LOAD ROUTES ----------------
app.use("/api", require("./routes/voice"));
app.use("/user", require("./routes/user"));
app.use("/channel", require("./routes/channel"));
app.use("/messages", require("./routes/messages"));

// ---------------- ERROR HANDLERS ----------------
app.use(errorHandler.notFound);
app.use(errorHandler.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandler.developmentErrors);
} else {
  app.use(errorHandler.productionErrors);
}

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}...`);
});

// ---------------- START SOCKET.IO ----------------
// ⚠️ VERY IMPORTANT: file ka naam EXACT `socket.js` hona chahiye
const sockets = require("./socket");
sockets.init(server);
