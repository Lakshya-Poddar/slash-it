//imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//.dotenv
require("dotenv").config();
//user schema
const USER = require("../schemas/userschema");
//login verification
const verify = require("./verifyToken");



//@route /login/test
//@desc Test route
//Verified Route
router.get("/test", verify, (req, res) => {
  console.log(req.user._id);
  res.send("TEST SUCCCESSFUL");
});



//@/login/
//@desc Login route
//Public route
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //checking if user exists
  const user = await USER.findOne({ email: email });
  if (!user)
    return res
      .status(400)
      .json({
        id: null,
        error: "EMAIL* OR PASSWORD IS INCORRECT",
        token: null,
      });
  //checking password
  const validpass = await bcrypt.compare(password, user.password);
  if (!validpass)
    return res
      .status(400)
      .json({
        id: null,
        error: "EMAIL OR PASSWORD* IS INCORRECT",
        token: null,
      });

  //Create and sign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: "1hr"});
  res
    .header("auth-shorten-token", token)
    .status(200)
    .json({ id: user._id, error: null, token: token }); 
});

module.exports = router;
