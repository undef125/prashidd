const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const verifyUserToken = require("../middleware/verify");
const {
  registerUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  removeUser,
  getSingleUser,
  updateUser,
  logoutUser,
  getAppliedEvents,
  recommendedEvents,
} = require("../controller/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);
router.post("/updateprofile/:userId", updateUser);
router.get("/logoutuser", logoutUser);

const {
  postQuery,
  getQuery,
  removeQuery,
} = require("../controller/contact.controller");
router.post("/postquery", postQuery);
router.get("/getqueries", getQuery);
router.delete("/deletequery/:queryId", removeQuery);

const {
  addEvent,
  getAllEvents,
  getSingleEvent,
  applyForEvent,
  addComment,
  deleteEvent,
  updateEvent,
} = require("../controller/event.controller");

router.post("/addevent", upload.single("image"), addEvent);
router.put("/updateevent/:eventId", upload.single("image"), updateEvent);
router.get("/getevents", getAllEvents);
router.get("/getevent/:id", getSingleEvent);
router.get("/applyforevent/:eventId", verifyUserToken, applyForEvent);
router.post("/addcomment/:eventId", verifyUserToken, addComment);
router.get("/getusers", getAllUsers);
router.get("/geteventsapplied/:userId", verifyUserToken, getAppliedEvents);

router.get("/getrecommendedevents/:userId", verifyUserToken, recommendedEvents);

// router.get("/getAppliedEvents/:userId",verifyUserToken, getAppliedEvents);

router.get("/getuser/:userId", getSingleUser);

router.delete("/deleteevent/:eventId", deleteEvent);
router.delete("/deleteuser/:userId", removeUser);

module.exports = router;
