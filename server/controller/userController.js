const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const Listing = require("../model/listingModel");

exports.updateUser = async (req, res) => {
  try {
    // console.log(req.body);

    if (req.user !== req.params.id) {
      return res.status(401).json({
        success: false,
        message: "User can't be updateed",
      });
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User is updated!",
      updatedUser,
    });
  } catch (error) {
    console.log("Error in update  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not updated!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }

    const deleteListings = await Listing.deleteMany({ userRef: req.params.id });

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "Account is deleted",
    });
  } catch (error) {
    console.log("Error in delete  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getUserListings = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user !== id) {
      return res.status(500).json({
        success: false,
        message: "Not a user",
      });
    }

    const listings = await Listing.find({ userRef: id });

    return res.status(200).json({
      success: true,
      message: "Listings Found!",
      listings,
    });
  } catch (error) {
    console.log("Error in get user lsiting  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Listings not found or fetched",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Found!",
      user,
    });
  } catch (error) {
    console.log("Error in get User controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }
};
