const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const checkNotAuth = require("../modules/checkNotAuth");
const jwt = require("jwt-encode")
const xssFilters = require("xss-filters");

router.get("/", checkNotAuth, (req, res) => {
  res.render("register");
});

router.post("/", checkNotAuth, async (req, res) => {
  try {
    const existing_user = await User.findOne({email: req.body.email})
    if (existing_user) return res.status(400).render('msg', {heading: 'Whoops its a 400', msg:'A user with that email already exists!', icon:'fal fa-exclamation-circle', css: 'color: red;',})
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const token = jwt({email: req.body.email}, process.env.JWT_SECRET)
    const user = new User({
      name: xssFilters.inHTMLData(req.body.name),
      email: req.body.email,
      password: hashedPassword,
      confirmCode: token,
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
