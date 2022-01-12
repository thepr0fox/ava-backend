const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(503).render("msg", {heading: 'Whoops its a 503', message: "This page is under development"});
});

module.exports = router;
