const router = require("express").Router();
const URL = require("../schemas/shortenschema");
const Verify = require("./verifyToken");
const uniqid = require("uniqid");
var mongoose = require("mongoose");

router.post("/", Verify, (req, res) => {
  var hash = req.body.hash || uniqid();
  URL.findOne({ hashed: req.body.hash }, (err, doc) => {
    if (doc) {
      hash = uniqid();
    }
    URL.findOne(
      { longUrl: req.body.longUrl, userid: req.user._id },
      (err, doc) => {
        if (doc) {
          console.log("doc", doc);
          return res.json({
            error: "This url has already been shortened by you",
            doc: null,
          });
        } else {
          const Url = new URL({
            hashed: hash,
            longUrl: req.body.longUrl,
            userid: req.user._id,
          });
          Url.save()
            .then((resp) => {
              res.json({ error: null, doc: resp });
            })
            .catch((err) => console.log("err", err));
        }
      }
    );
  });
});

router.get("/list", Verify, (req, res) => {
  URL.find({ userid: req.user._id }, (err, doc) => {
    res.json(doc);
  });
});

router.post("/delete", Verify, (req, res) => {
  URL.findByIdAndRemove({ _id: req.body.deleteid }, (err, doc) => {
    if (doc) {
      return res.send(doc);
    } else {
      console.log("No such url present");
    }
  });
});

module.exports = router;
