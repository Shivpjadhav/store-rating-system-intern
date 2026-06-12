const db = require("../db");

exports.submitRating = async (req, res) => {

    try {

        const { store_id, rating } =
            req.body;

        const [existing] =
            await db.query(
                `
                SELECT *
                FROM ratings
                WHERE user_id = ?
                AND store_id = ?
                `,
                [
                    req.user.id,
                    store_id
                ]
            );

        if (existing.length > 0) {

            return res.status(400).json({
                message:
                    "You already rated this store"
            });

        }

        await db.query(
            `
            INSERT INTO ratings
            (
                user_id,
                store_id,
                rating
            )
            VALUES (?,?,?)
            `,
            [
                req.user.id,
                store_id,
                rating
            ]
        );

        res.json({
            message:
                "Rating Submitted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.updateRating = async (req, res) => {

    try {

        const { rating } =
            req.body;

        await db.query(
            `
            UPDATE ratings
            SET rating = ?
            WHERE store_id = ?
            AND user_id = ?
            `,
            [
                rating,
                req.params.storeId,
                req.user.id
            ]
        );

        res.json({
            message:
                "Rating Updated Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
