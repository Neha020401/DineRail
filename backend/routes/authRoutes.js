const express = require("express");
const router = express.Router();

const { userLogin, providerLogin, userSignUp, providerSignUp } = require("../controller/authController");

require("dotenv").config();

router.post("/user/login", userLogin);
router.post("/provider/login", providerLogin);

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.post("/user/signup", userSignUp);
router.post("/provider/signup", providerSignUp);

module.exports = router;