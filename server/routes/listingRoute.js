const {
  createListing,
  deleteListing,
  updateListing,
  getListings,
  getListing,
  getAllListings,
  getByLocation,
  getByType,
} = require("../controller/listingController");
const { verifyToken } = require("../middlewares/verifyUser");

const router = require("express").Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get-listing/:id", getListing);
router.get("/get", getListings);
router.get("/getall", getAllListings);
router.get("/get-location", getByLocation);
router.get("/get-type", getByType);

module.exports = router;
