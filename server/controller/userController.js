exports.updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in signout  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User not singed out",
    });
  }
};
