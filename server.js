//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
//import dotenv
require("dotenv").config();
//url
const URL = require("./schemas/shortenschema");

app.use(cors());
//bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));


//routes signup
const singuproute = require("./routes/signuproute");
app.use("/signup", singuproute);

//routes login
const loginroute = require("./routes/loginroute");
app.use("/login", loginroute);

//routes shorten
const shortenroute = require("./routes/shortenroute");
app.use("/shorten", shortenroute);

//routing every one accessing the server
app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  URL.findOne({ hashed: id }, (err, doc) => {
    if (doc) {
      console.log(doc);
      return res.redirect(doc.longUrl);
    }
  });
});

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
