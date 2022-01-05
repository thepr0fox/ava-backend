const express = require("express");
const router = express.Router();
const checkAuth = require("../checkAuth/checkAuth");

router.get("/", checkAuth, (req, res) => {
  res.render("index", { name: req.user.name });
});

module.exports = router;
