const express = require("express");
const router = express.Router();

const ratingController =
    require("../controllers/ratingController");

const {
    verifyToken
} = require("../middleware/authMiddleware");

router.post(
    "/",
    verifyToken,
    ratingController.submitRating
);

router.put(
    "/:storeId",
    verifyToken,
    ratingController.updateRating
);

module.exports = router;