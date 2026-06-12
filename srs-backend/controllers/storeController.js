const db = require("../db");

exports.getStores = async (req, res) => {

    try {

        const { name = "" } = req.query;

        const [stores] = await db.query(
            `
            SELECT
                s.id,
                s.name,
                s.address,

                ROUND(
                    AVG(r.rating),
                    1
                ) AS average_rating,

                (
                    SELECT rating
                    FROM ratings
                    WHERE store_id = s.id
                    AND user_id = ?
                    LIMIT 1
                ) AS user_rating

            FROM stores s

            LEFT JOIN ratings r
                ON s.id = r.store_id

            WHERE
                s.name LIKE ?
                OR s.address LIKE ?

            GROUP BY
                s.id,
                s.name,
                s.address

            ORDER BY s.name ASC
            `,
            [
                req.user.id,
                `%${name}%`,
                `%${name}%`
            ]
        );

        res.json(stores);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};