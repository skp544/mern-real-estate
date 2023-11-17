const User = require("../model/userModel");

const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token!",
    });
  }

  const jwtToken = token.split("Bearer ")[1];

  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const { id } = decode;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Token User not found",
    });
  }

  req.user = id;

  console.log(req);

  next();
};
