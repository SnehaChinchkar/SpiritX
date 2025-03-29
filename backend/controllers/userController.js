const User = require('../models/user-model');

const getUserProfile = (req, res) => {
    res.json({ message: "User profile route working!" });
};

module.exports = { getUserProfile };
