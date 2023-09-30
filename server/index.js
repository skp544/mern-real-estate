// imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();

const app = express();

// middlewasres
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);

// port
const PORT = process.env.PORT || 8000;

// functions
connectDB();

// server
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
