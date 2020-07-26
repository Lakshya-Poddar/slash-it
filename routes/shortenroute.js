const router = require("express").Router();
const URL = require("../schemas/shortenschema");
const Verify = require("./verifyToken");
const uniqid = require("uniqid");

//@route /shorten/test
//@desc Test route
//Public access
router.get("/test", Verify, (req, res) => {
  res.send("SHORTENURL TEST SUCCESSFUL");
});

//@route /shorten/availhash/
//@desc checking if user defined hash is available
//verified route
// router.post("/availhash", Verify, (req, res) => {
//   const hash = req.body.hash;
//   URL.findOne({ hashed: hash }, (err, doc) => {
//     if (doc) return res.json({ available: "Not Available" });
//     res.status(200).json({ available: "Yes Available" });
//   });
// });

//@route /shorten/
//@desc creating short urls
//Verified route
router.post("/", Verify, (req, res) => {
  //apply verify to this route
  var hash = req.body.hash || uniqid();
  URL.findOne({ hashed: req.body.hash }, (err, doc) => {
    //checking if hash is available
    if (doc) {
      hash= uniqid();
    }
    URL.findOne(
      { longUrl: req.body.longUrl, userid: req.user._id }, //checking longurl same or not for a user
      (err, doc) => {
        if (doc) {
          console.log("doc", doc);
          return res.json({error:"This url has already been shortened by you",doc:null});
        } else {
          const Url = new URL({
            hashed: hash,
            longUrl: req.body.longUrl,
            userid: req.user._id,
          });
          Url.save()
            .then((resp) => {
              console.log("resp", resp);
              res.json({error:null,doc:resp});
            })
            .catch((err) => console.log("err", err));
        }
      }
    );
  });
});

//@route /shorten/list
//@desc finding all hashed urls by a user
//Verified route
router.get("/list", Verify, (req, res) => {
  URL.find({ userid: req.user._id }, (err, doc) => {
    res.json(doc);
  });
});

router.delete("/delete", (req, res) => {
  URL.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {
    if (doc) {
      console.log("doc", doc);
      return res.send(doc);
    } else {
      console.log("No such url present");
    }
  });
});

module.exports = router;
