// const router = require("express").Router();
// const { catchErrors } = require("../handlers/errorHandler");
// const messagesController = require("../controllers/messagesController");

// const auth = require("../middlewares/auth");

// router.get(
//   "/:channelId",
//   auth,
//   catchErrors(messagesController.getAllMessagesInRoom)
// );

// module.exports = router;


//////1-----------------------------------------------

const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const messagesController = require("../controllers/messagesController");

const auth = require("../middlewares/auth");

// Route to get all messages in a specific channel
router.get(
  "/:channelId",
  auth,
  catchErrors(messagesController.getAllMessagesInRoom)
);

// Route to delete a specific message
router.delete(
  "/delete/:messageId",  // :messageId will be passed as a parameter in the request
  auth,  // Authentication middleware to ensure the user is logged in
  catchErrors(messagesController.deleteMessage)  // Catch errors and forward to the controller
);

module.exports = router;
