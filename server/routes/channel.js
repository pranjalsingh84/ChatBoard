// const router = require("express").Router();
// const { catchErrors } = require("../handlers/errorHandler");
// const channelController = require("../controllers/channelController");


// const auth = require("../middlewares/auth");

// router.get("/", auth, catchErrors(channelController.getAllChannels));
// router.get(
//   "/:id/sentiment",
//   auth,
//   catchErrors(channelController.getChannelSentiment)
// );
// router.post("/", auth, catchErrors(channelController.createChannel));
// // delete route 
// router.delete("/:id", auth, catchErrors(channelController.deleteChannel));


// module.exports = router;

///-----------------------1---------------------------------------------------------------

const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const channelController = require("../controllers/channelController");
const auth = require("../middlewares/auth");

// 🧠 Get all channels
router.get("/", auth, catchErrors(channelController.getAllChannels));

// 📊 Get sentiment data for a specific channel
router.get("/:id/sentiment", auth, catchErrors(channelController.getChannelSentiment));

// ➕ Create a new channel
router.post("/", auth, catchErrors(channelController.createChannel));

// ❌ Delete a specific channel by ID
router.delete("/:id", auth, catchErrors(channelController.deleteChannel));

module.exports = router;
