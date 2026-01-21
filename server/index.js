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
  const ADMIN_USERNAME = "Admin";

  const io = require("socket.io")(server, {
    cors: {
      origin: "*",   // later frontend URL daal sakte ho
      methods: ["GET", "POST"],
    },
  });

  // 🔐 SOCKET AUTH MIDDLEWARE
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;   // 👈 FIX (auth.token)
      if (!token) return next(new Error("No token"));

      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      console.log("Socket auth error:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    socket.on("disconnect", () => {
      const user = getCurrentUser(socket.userId);
      if (user) {
        socket.leave(user.channelId);
        userLeaves(socket.userId);

        const newMessage = {
          message: user.username + " left the channel!",
          username: ADMIN_USERNAME,
          userId: ADMIN_ID,
        };

        socket.broadcast.to(user.channelId).emit("newMessage", newMessage);
        io.to(user.channelId).emit("onlineUsers", {
          users: getOnlineUsersInChannel(user.channelId),
        });
      }
    });

    // JOIN CHANNEL
    socket.on("joinChannel", async ({ username, channelId }) => {
      socket.join(channelId);
      userJoins(socket.userId, username, channelId);

      const newMessage = {
        message: username + " joined the channel!",
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      };

      socket.broadcast.to(channelId).emit("newMessage", newMessage);
      io.to(channelId).emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
      });
    });

    // LEAVE CHANNEL
    socket.on("leaveChannel", async ({ username, channelId }) => {
      socket.leave(channelId);
      userLeaves(socket.userId);

      const newMessage = {
        message: username + " left the channel!",
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      };

      socket.broadcast.to(channelId).emit("newMessage", newMessage);
      io.to(channelId).emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
      });
    });

    // NEW MESSAGE
    socket.on("newMessage", async ({ username, channelId, message }) => {
      if (message.trim().length === 0) return;

      const sentimentResult = sentiment.analyze(message);

      io.to(channelId).emit("newMessage", {
        message,
        username,
        userId: socket.userId,
        sentimentScore: sentimentResult.score,
      });

      const channel = await Channel.findOne({ _id: channelId });

      const sentimentData = getCurrentSentiment(channel, sentimentResult);

      io.to(channelId).emit("updateSentiment", sentimentData);

      await Channel.updateOne({ _id: channelId }, { $set: sentimentData });

      const user = await User.findOne({ _id: socket.userId });
      await User.updateOne({ _id: socket.userId }, { $set: sentimentData });

      const newMessage = new Message({
        channel: channelId,
        user: socket.userId,
        sentimentScore: sentimentResult.score,
        message,
      });

      await newMessage.save();
    });
  });
};

const getCurrentSentiment = (entity, currSentimentResult) => {
  return {
    totalSentimentScore: entity.totalSentimentScore + currSentimentResult.score,
    totalMessages: entity.totalMessages + 1,
    positive: entity.positive + (currSentimentResult.score > 1 ? 1 : 0),
    neutral:
      entity.neutral +
      (currSentimentResult.score <= 1 && currSentimentResult.score >= -1
        ? 1
        : 0),
    negative: entity.negative + (currSentimentResult.score < -1 ? 1 : 0),
  };
};

module.exports = sockets;
