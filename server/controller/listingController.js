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
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found!",
      });
    }

    if (req.user !== listing.userRef) {
      return res.status(404).json({
        success: false,
        message: "You cannot update the listing!",
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Property is Updated",
      updatedListing,
    });
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
      success: true,
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

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      listings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    let listings;

    listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    if (listings.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All properties fetched",
        listings,
      });
    }
    listings = await Listing.find({
      address: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json({
      success: true,
      message: "All properties fetched",
      listings,
    });

    // const listings = await Listing.find();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Properties not found!",
    });
  }
};

exports.getByLocation = async (req, res) => {
  try {
    const location = req.query.location;

    const listings = await Listing.find({
      address: { $regex: location, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "Data fetched Successfully!",
      data: listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Properties not found!",
    });
  }
};

exports.getByType = async (req, res) => {
  try {
    const type = req.query.type;

    const listings = await Listing.find({
      type: { $regex: type, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "Data fetched Successfully!",
      data: listings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Properties not found!",
    });
  }
};
