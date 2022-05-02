const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/auth");
let app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

const routes = require("./routes/index.route.js");
app.use(routes);

const database = require("./configs/connection.js");

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
