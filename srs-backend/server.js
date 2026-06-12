require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
    res.json({
        message: "Store rating Api running successfully"
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});