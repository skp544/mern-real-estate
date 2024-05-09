const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }

    const alreadyExisted = await User.findOne({ email });

    if (alreadyExisted) {
      return res.status(401).json({
        success: false,
        message: "User already existed. Please sign in!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.log("Error in signup controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not created",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found Please sign up!",
      });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({
        success: true,
        message: "User sign in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token,
      });
  } catch (error) {
    console.log("Error in sign in controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not signed in",
    });
  }
};

exports.google = async (req, res) => {
  try {
    const { email, name, photo } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json({
          success: true,
          message: "User sign in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
          token,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "User sign in successfully",
          user: {
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            _id: newUser._id,
          },
          token,
        });
    }
  } catch (error) {
    console.log("Error in google  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Google not signed in",
    });
  }
};

exports.signOut = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User has been logged out!",
    });
  } catch (error) {
    console.log("Error in signout  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not singed out",
    });
  }
};
