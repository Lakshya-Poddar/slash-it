const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const USER = require("../schemas/userschema");
const verify = require("./verifyToken");

require("dotenv").config();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await USER.findOne({ email: email });
  if (!user)
    return res.status(200).json({
      user: null,
      error: "*Email not registered",
      token: null,
    });
  const validpass = await bcrypt.compare(password, user.password);
  if (!validpass)
    return res.status(200).json({
      user: null,
      error: "*Incorrect Credentials",
      token: null,
    });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    user: { _id: user._id, name: user.name, email: user.email },
    error: null,
    token: token,
  });
});

module.exports = router;
