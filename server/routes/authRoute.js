const express = require("express");

// controllers
const {
  signup,
  signin,
  google,
  signOut,
} = require("../controller/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

module.exports = router;
