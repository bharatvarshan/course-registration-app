const express = require("express");
const app = express();
const userRouter = express.Router();
const studentModel = require("../models/student.model.js");

userRouter.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
  console.log(req.user);
});

module.exports = userRouter;
