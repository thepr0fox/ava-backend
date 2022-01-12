function checkNotVerified(req, res, next) {
    if (req.user.verified) {
      return res.redirect("/");
    }
    return next();
  }
  
  module.exports = checkNotVerified;
  