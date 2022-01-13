const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(503).render("msg", {heading: 'Whoops its a 503', msg: "This page is under development", icon:'fal fa-exclamation-circle', css: 'color: red;',});
});

module.exports = router;
