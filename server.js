const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const favicon = require("serve-favicon");
const URL = require("./schemas/shortenschema");

require("dotenv").config();

app.use(cors());
app.use(compression());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, "client", "public", "favicon.ico")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
  app.use(express.static("client/build"));
  app.get("/signinuser", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/signupuser", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/shortenurl", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/allshort", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));

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

const singuproute = require("./routes/signuproute");
app.use("/signup", singuproute);
const loginroute = require("./routes/loginroute");
app.use("/login", loginroute);
const shortenroute = require("./routes/shortenroute");
app.use("/shorten", shortenroute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
