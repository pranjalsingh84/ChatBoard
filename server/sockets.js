const mongoose = require("mongoose");
const jwt = require("jwt-then");
const Sentiment = require("sentiment");

const Message = mongoose.model("Message");
const User = mongoose.model("User");
const Channel = mongoose.model("Channel");

const {
  userJoins,
  userLeaves,
  getCurrentUser,
  getOnlineUsersInChannel,
} = require("./utils/onlineUsers");

let sockets = {};
let sentiment = new Sentiment();

sockets.init = (server) => {
  const ADMIN_ID = "admin";
  const ADMIN_USERNAME = "ADMIN";

  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // 🔥 AUTH MIDDLEWARE FOR SOCKET
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.JWT_SECRET); // 🔥 SAME SECRET
      socket.userId = payload.id;
      next();
    } catch (err) {
      console.log("Socket auth failed");
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {

    // USER JOINS CHANNEL
    socket.on("joinChannel", async ({ username, channelId }) => {
      socket.join(channelId);
      userJoins(socket.userId, username, channelId);

      socket.broadcast.to(channelId).emit("newMessage", {
        message: `${username} joined the channel!`,
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      });

      io.to(channelId).emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
      });
    });

    // USER LEAVES CHANNEL
    socket.on("leaveChannel", async ({ username, channelId }) => {
      socket.leave(channelId);
      userLeaves(socket.userId);

      socket.broadcast.to(channelId).emit("newMessage", {
        message: `${username} left the channel!`,
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      });

      io.to(channelId).emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
      });
    });

    // USER SEND MESSAGE
    socket.on("newMessage", async ({ username, channelId, message }) => {
      if (!message || message.trim().length === 0) return;

      const sentimentResult = sentiment.analyze(message);

      io.to(channelId).emit("newMessage", {
        message,
        username,
        userId: socket.userId,
        sentimentScore: sentimentResult.score,
      });

      const newMessage = new Message({
        channel: channelId,
        user: socket.userId,
        sentimentScore: sentimentResult.score,
        message,
      });

      await newMessage.save();
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      const user = getCurrentUser(socket.userId);
      if (user) {
        socket.leave(user.channelId);
        userLeaves(socket.userId);

        socket.broadcast.to(user.channelId).emit("newMessage", {
          message: `${user.username} left the channel!`,
          username: ADMIN_USERNAME,
          userId: ADMIN_ID,
        });
      }
    });

  });
};

module.exports = sockets;
