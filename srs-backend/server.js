require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/admin",
    require("./routes/adminRoutes")
);

app.use(
    "/api/stores",
    require("./routes/storeRoutes")
);

app.use(
    "/api/ratings",
    require("./routes/ratingRoutes")
);

app.use(
    "/api/owner",
    require("./routes/ownerRoutes")
);

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "Store Rating API Running Successfully"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});