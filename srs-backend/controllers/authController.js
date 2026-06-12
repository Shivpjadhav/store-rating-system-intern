const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {

    try {

        const { name, email, password, address } = req.body;

        const [existing] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users
            (name,email,password,address,role)
            VALUES(?,?,?,?,?)`,
            [
                name,
                email,
                hashedPassword,
                address,
                "USER"
            ]
        );

        res.status(201).json({
            message: "User Registered"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = users[0];

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            token,
            user: {
                id: user.id,
                role: user.role,
                name: user.name
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
exports.changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } =
            req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE id=?",
            [req.user.id]
        );

        const user = users[0];

        const match =
            await bcrypt.compare(
                oldPassword,
                user.password
            );

        if (!match) {
            return res.status(400).json({
                message: "Old password incorrect"
            });
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        await db.query(
            "UPDATE users SET password=? WHERE id=?",
            [hashedPassword, req.user.id]
        );

        res.json({
            message: "Password Updated"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};