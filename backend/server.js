const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
let app = express();
app.use(bodyParser.json());

const routes = require("./routes/index.route.js");
app.use(routes);

const database = require("./configs/connection.js");

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
