const express = require("express");
const router = express.Router();
const checkNotVerified = require("../modules/checkNotVerified");
const checkAuth = require("../modules/checkAuth");
const sendEmail = require("../modules/sendEmail");
const User = require("../models/user");

router.get("/", checkAuth, checkNotVerified, (req, res) => {
  const port = process.env.PORT || 3000;

  sendEmail(
    req.user.email,
    `Please verify your account`,
    `<h1>Email Confirmation</h1>
    <h2>Hello ${req.user.name}</h2>
    <p>Thank you for signing up for ava-network. Please confirm your email by clicking on the following link</p>
    <a href=https://${req.hostname}/verify/${req.user.confirmCode}> Click here to verify</a>
    <p>If you didn't signed up for ava-network then someone might have mistakenly used your email</p>`
  );

  res.status(401).render("msg", {
    heading: "Whoops its a 401",
    msg: `Please verify your account\nWe have sent a verification link to ${req.user.email}. Check the spam section, if you can't find the email`,
    icon: "fal fa-envelope",
    css: "color: #bab9c7;",
  });
});

router.get("/:confirmCode", checkAuth, checkNotVerified, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.params.confirmCode != user.confirmCode)
      return res.status(404).render("msg", {
        heading: "Whoops its a 404",
        msg: "Invalid verification code",
        icon: "fal fa-exclamation-circle",
        css: "color: red;",
      });
    user.verified = true;
    await user.save();
    res.status(200).render("msg", {
      heading: "Account verified",
      msg: "You may now close this tab",
      icon: "fal fa-check-circle",
      css: "color: green;",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).render("msg", {
      heading: "Whoops its a 500",
      msg: "This is an error from our part, we will fix it as soon as possible",
      icon: "fal fa-exclamation-circle",
      css: "color: red;",
    });
  }
});

module.exports = router;
