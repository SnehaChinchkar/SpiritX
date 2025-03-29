const jwt = require("jsonwebtoken");

const generateToken = (res, userId, role) => {
    try {
        const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

module.exports = generateToken;
