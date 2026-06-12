const db = require("../db");
const bcrypt = require("bcryptjs");

exports.dashboard = async (req, res) => {
    try {

        const [[users]] = await db.query(
            "SELECT COUNT(*) totalUsers FROM users"
        );

        const [[stores]] = await db.query(
            "SELECT COUNT(*) totalStores FROM stores"
        );

        const [[ratings]] = await db.query(
            "SELECT COUNT(*) totalRatings FROM ratings"
        );

        res.json({
            totalUsers: users.totalUsers,
            totalStores: stores.totalStores,
            totalRatings: ratings.totalRatings
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.addUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await db.query(
            `
            INSERT INTO users
            (name,email,password,address,role)
            VALUES (?,?,?,?,?)
            `,
            [
                name,
                email,
                hashedPassword,
                address,
                role
            ]
        );

        res.status(201).json({
            message: "User Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getUsers = async (req, res) => {

    try {

        const [users] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                address,
                role
            FROM users
            `
        );

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getUserById = async (req, res) => {

    try {

        const { id } = req.params;

        const [users] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                address,
                role
            FROM users
            WHERE id = ?
            `,
            [id]
        );

        if (users.length === 0) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        const user = users[0];

        if (user.role === "STORE_OWNER") {

            const [[rating]] =
                await db.query(
                    `
                    SELECT
                    ROUND(AVG(r.rating),1)
                    AS average_rating
                    FROM stores s
                    LEFT JOIN ratings r
                    ON s.id = r.store_id
                    WHERE s.owner_id = ?
                    `,
                    [id]
                );

            user.rating =
                rating.average_rating || 0;
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.addStore = async (req, res) => {

    try {

        const {
            name,
            email,
            address,
            owner_id
        } = req.body;

        await db.query(
            `
            INSERT INTO stores
            (name,email,address,owner_id)
            VALUES (?,?,?,?)
            `,
            [
                name,
                email,
                address,
                owner_id
            ]
        );

        res.status(201).json({
            message: "Store Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getStores = async (req, res) => {

    try {

        const [stores] = await db.query(
            `
            SELECT
                s.id,
                s.name,
                s.email,
                s.address,
                ROUND(AVG(r.rating),1)
                AS average_rating
            FROM stores s
            LEFT JOIN ratings r
                ON s.id = r.store_id
            GROUP BY
                s.id,
                s.name,
                s.email,
                s.address
            ORDER BY s.name ASC
            `
        );

        res.json(stores);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};