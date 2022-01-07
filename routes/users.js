const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(503).send("Error code 503: This page is currently under development");
});

module.exports = router;
