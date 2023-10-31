const express = require("express");
const { updateUser } = require("../controller/userController");

const router = express.Router();

router.post("/update/:id", updateUser);

module.exports = router;
