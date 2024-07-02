const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
var path = require("path"),
  fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(
  cors({
    origin: [
      "https://perumalsftdevls-e-commerce-front-end.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use("/api", router);

// app.post("/apitest", (req, res) => {
//   if (req.body) {
//     console.log(req.body, req.query.data, req.params);
//     return res.send(req.body);
//   }
// });
/* This line of code `app.use("/assets", express.static(path.join(__dirname, "assets")));` is setting
up a static file server to serve files from the "assets" directory. */
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
