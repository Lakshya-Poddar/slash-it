//imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//Login Verification
const verify = require("./verifyToken");
//User Schema
const USER = require("../schemas/userschema");

//@route singup/test
//@desc test route
//@Verified access
router.use(cors());
router.get("/test", verify, (req, res) => {
  res.send("TEST SUCCESSFUL");
});

//@route signup/
//@desc create new user
//Public access
router.post("/", (req, res) => {
  USER.findOne({ email: req.body.email }, async (err, doc) => {
    if (doc) {
      return res.json({
        user: null,
        error: "EMAIL ALREADY EXISTS",
        token: null,
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const User = new USER({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    User.save()
      .then((user) => {
        //console.log("resp", user); //console out here
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res
          .header("auth-shorten-token", token)
          .status(200)
          .json({
            user: { _id: user._id, name: user.name, email: user.email },
            error: null,
            token: token,
          }); //token sending to be removed
      })
      .catch((err) => {
        console.log("err", err); //console out here
        res.status(200).json({
          user: null,
          error: "THERE WAS THE ERROR WITH THE SERVER, PLEASE TRY AGAIN LATER",
          token: null,
        });
      });
  });
});

module.exports = router;
