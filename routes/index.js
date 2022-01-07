const express = require("express");
const router = express.Router();
const checkAuth = require("../checkAuth/checkAuth");
const Post = require("../models/post");
const User = require("../models/user");
const xssFilters = require("xss-filters");

router.get("/", checkAuth, async (req, res) => {
  let posts;

  try {
    posts = await Post.find().sort({ postedAt: "desc" }).lean().exec();
  } catch (err) {
    console.log(err);
    posts = [];
  }
  res.render("index", {
    name: req.user?.name,
    posts: posts
  });
});

router.post("/post", checkAuth, async (req, res) => {
  console.log(await User.findOne({email: req.user.email}))
  const post = new Post({
    content: xssFilters.inHTMLData(req.body.content),
    user: await User.findOne({ email: req.user.email }),
  });
  try {
    const newPost = await post.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
