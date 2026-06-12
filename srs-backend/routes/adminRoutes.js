const express = require("express");
const router = express.Router();

const adminController =
    require("../controllers/adminController");

router.get(
    "/dashboard",
    adminController.dashboard
);

router.post(
    "/users",
    adminController.addUser
);

router.get(
    "/users",
    adminController.getUsers
);

router.get(
    "/users/:id",
    adminController.getUserById
);

router.post(
    "/stores",
    adminController.addStore
);

router.get(
    "/stores",
    adminController.getStores
);

module.exports = router;