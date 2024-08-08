const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const verifyUserToken = require("../middleware/verify");
const { registerUser, loginUser } = require("../controller/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
const {
  addEvent,
  getAllEvents,
  getSingleEvent,
  applyForEvent,
  addComment,
} = require("../controller/event.controller");

router.post("/addevent", upload.single("image"), addEvent);
router.get("/getevents", getAllEvents);
router.get("/getevent/:id", getSingleEvent);
router.post("/applyforevent/:eventId", verifyUserToken, applyForEvent);
router.post("/addcomment/:eventId", verifyUserToken, addComment);

module.exports = router;
