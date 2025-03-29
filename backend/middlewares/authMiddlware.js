
const jwt = require("jsonwebtoken");
const blacklist = require("../models/blacklist");

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
        const blacklistedToken = await blacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: "Token has been revoked. Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateUser;
