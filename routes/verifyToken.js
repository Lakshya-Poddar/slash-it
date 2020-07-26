const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header('auth-shorten-token')
  if (!token) return res.status(200).json({ error: "PLEASE LOGIN TO CONTINUE USING THE SERVICE" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(200).json({ error: "YOU ARE NOT AUTHENTICATED/THERE MAY BE SOME TRAFFIC PLEASE TRY AGAIN LATER" });
  }
};
