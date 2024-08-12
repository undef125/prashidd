const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const verifyUserToken = require("../middleware/verify");
const {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  postQuery,
  getQuery,
} = require("../controller/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);
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
router.get("/getusers", getAllUsers);
router.post("/contactus", postQuery);
router.get("/getquery", getQuery);

module.exports = router;
