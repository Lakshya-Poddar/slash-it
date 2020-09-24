const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const verify = require("./verifyToken");
const USER = require("../schemas/userschema");
router.use(cors());

router.post("/", (req, res) => {
  USER.findOne({ email: req.body.email }, async (err, doc) => {
    if (doc) {
      return res.json({
        user: null,
        error: "Email already exists!",
        token: null,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const User = new USER({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    User.save()
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res
          .header("auth-shorten-token", token)
          .status(200)
          .json({
            user: { _id: user._id, name: user.name, email: user.email },
            error: null,
            token: token,
          });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(200).json({
          user: null,
          error: "There was a error with the server, please try again later",
          token: null,
        });
      });
  });
});
module.exports = router;
