const express = require("express");
const {
  signup,
  login,
  validateToken,
} = require("../../controllers/auth-controller/index");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);
router.post("/validate-token", validateToken);

module.exports = router;
