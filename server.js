//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
//import dotenv
require("dotenv").config();
//url
const URL = require("./schemas/shortenschema");

app.use(cors());
app.use(compression());
//bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));

//routing every one accessing the server
app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  URL.findOne({ hashed: id }, (err, doc) => {
    if (doc) {
      console.log(doc);
      return res.redirect(doc.longUrl);
    } else {
      app.use(express.static("client/build"));
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    }
  });
});

//routes signup
const singuproute = require("./routes/signuproute");
app.use("/signup", singuproute);

//routes login
const loginroute = require("./routes/loginroute");
app.use("/login", loginroute);

//routes shorten
const shortenroute = require("./routes/shortenroute");
app.use("/shorten", shortenroute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));

//serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("/signinuser", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
//   app.get("/signupuser", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
//   app.get("/shortenurl", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
//   app.get("/allshort", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
