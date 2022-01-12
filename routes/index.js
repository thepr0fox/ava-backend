const express = require("express");
const router = express.Router();
const checkAuth = require("../modules/checkAuth");
const Post = require("../models/post");
const User = require("../models/user");
const checkVerified = require("../modules/checkVerified");
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
    name: req.user.name,
    u_email: req.user.email,
    posts: posts.map((post) => {
      post.time = Math.floor((Date.now() - post.postedAt) / 1000);
      if (post.time == 1) post.unit = "second";
      else post.unit = "seconds";
      if (post.time >= 60) {
        post.time = Math.floor(post.time / 60);
        if (post.time == 1) post.unit = "minute";
        else post.unit = "minutes";
        if (post.time >= 60) {
          post.time = Math.floor(post.time / 60);
          if (post.time == 1) post.unit = "hour";
          else post.unit = "hours";
          if (post.time >= 24) {
            post.time = Math.floor(post.time / 24);
            if (post.time == 1) post.unit = "day";
            else post.unit = "days";
            if (post.time >= 30) {
              post.time = Math.floor(post.time / 30);
              if (post.time == 1) post.unit = "month";
              else post.unit = "months";
              if (post.time >= 12) {
                post.time = Math.floor(post.time / 12);
                if (post.time == 1) post.unit = "year";
                else post.unit = "years";
              }
            }
          }
        }
      }

      return post;
    }),
  });
});

router.post("/post", checkAuth, checkVerified,  async (req, res) => {
  const post = new Post({
    content: xssFilters.inHTMLData(req.body.content),
    user: req.user,
    userName: req.user.name,
    userEmail: req.user.email,
  });
  try {
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
