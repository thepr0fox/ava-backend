const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const checkNotAuth = require("../checkAuth/checkNotAuth");
const xssFilters = require("xss-filters");

router.get("/", checkNotAuth, (req, res) => {
  res.render("register");
});

router.post("/", checkNotAuth, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: xssFilters.inHTMLData(req.body.name),
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
