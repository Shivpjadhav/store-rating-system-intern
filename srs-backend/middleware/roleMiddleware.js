exports.isAdmin = (req, res, next) => {

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "admin access ONly"
        });
    }

    next();
};

exports.isStoreOwner = (req, res, next) => {

    if (req.user.role !== "STORE_OWNER") {
        return res.status(403).json({
            message: "store owner access only"
        });
    }

    next();
};