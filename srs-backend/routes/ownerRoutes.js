const express = require("express");
const router = express.Router();

const ownerController = require("../controllers/ownerController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isStoreOwner } = require("../middleware/roleMiddleware");

router.get(
    "/dashboard",
    verifyToken,
    isStoreOwner,
    ownerController.dashboard
);

router.get(
    "/ratings",
    verifyToken,
    isStoreOwner,
    ownerController.getRatings
);

module.exports = router;
