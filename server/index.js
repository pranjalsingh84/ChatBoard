// Load environment variables first
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  credentials: true
}));

// 🔥 CONNECT MONGODB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database."))
  .catch(err => console.log("Mongoose connection ERROR:", err.message));

// 🔥 REGISTER MODELS FIRST (VERY IMPORTANT ORDER)
require("./models/User");
require("./models/Channel");
require("./models/Message");

// Routes
app.use("/user", require("./routes/user"));

// Error handlers
app.use(errorHandler.notFound);
app.use(errorHandler.mongooseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandler.developmentErrors);
} else {
  app.use(errorHandler.productionErrors);
}

// 🔥 START SERVER
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// 🔥 INIT SOCKET AFTER MODELS + SERVER
const sockets = require("./socket");
sockets.init(server);
