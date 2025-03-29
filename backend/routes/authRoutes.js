const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authControllers");
const authenticateUser = require("../middlewares/authMiddlware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateUser, (req, res) => res.json({ user: req.user }));

module.exports = router;
