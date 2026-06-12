const db = require("../db");

exports.dashboard = async (req, res) => {
    const [[stats]] = await db.query(
        `
        SELECT
            ROUND(AVG(r.rating), 1) AS average_rating
        FROM ratings r
        JOIN stores s ON s.id = r.store_id
        WHERE s.owner_id = ?
        `,
        [req.user.id]
    );

    res.json({
        average_rating: stats?.average_rating || 0
    });
};

exports.getRatings = async (req, res) => {
    const [ratings] = await db.query(
        `
        SELECT
            u.name,
            u.email,
            r.rating
        FROM ratings r
        JOIN users u ON u.id = r.user_id
        JOIN stores s ON s.id = r.store_id
        WHERE s.owner_id = ?
        `,
        [req.user.id]
    );

    res.json(ratings);
};
