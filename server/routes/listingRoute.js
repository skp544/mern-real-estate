const {
  createListing,
  deleteListing,
  updateListing,
  getListings,
  getListing,
} = require("../controller/listingController");
const { verifyToken } = require("../middlewares/verifyUser");

const router = require("express").Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

module.exports = router;
