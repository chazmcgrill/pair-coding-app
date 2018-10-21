module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect
    return res.status(401).redirect("/");
  }
  next();
};