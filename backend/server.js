const express = require("express");
let app = express();
require("dotenv").config();
const routes = require("./routes/index.route.js");
app.use(routes);

const database = require("./configs/connection.js");
const Student = require("./models/student.model.js");

// Student.find({ name: "bv" }, (error, result) => {
//   console.log(result);
// });

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
