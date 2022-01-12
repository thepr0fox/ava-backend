const express = require("express");
const router = express.Router();
const checkAuth = require("../modules/checkAuth");

router.get("/", checkAuth, (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
