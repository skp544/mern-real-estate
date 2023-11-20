const Listing = require("../model/listingModel");

exports.createListing = async (req, res) => {
  console.log(req.body);
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Property is created!",
      listing,
    });
  } catch (error) {
    console.log("Error in create listing  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Property not created!",
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found!",
      });
    }

    if (req.user !== listing.userRef) {
      return res.status(401).json({
        success: false,
        message: "You cannot delete it",
      });
    }

    await Listing.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Propery is deleted",
    });
  } catch (error) {
    console.log("Error in delete listing  controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Property not deleted!",
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Property not updated!",
    });
  }
};

exports.getListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Listing found",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Property not found!",
    });
  }
};

exports.getListings = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Properties not found!",
    });
  }
};
