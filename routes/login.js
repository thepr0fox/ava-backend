const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const checkNotAuth = require("../checkAuth/checkNotAuth");

const initPassport = require("../passport-config");
initPassport(
  passport,
  async (uEmail) => (user = await User.findOne({ email: uEmail })),
  async (id) => await User.findById(id)
);

router.get("/", checkNotAuth, (req, res) => {
  res.render("login");
});

router.post(
  "/",
  checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
