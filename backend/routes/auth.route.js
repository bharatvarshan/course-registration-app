const express = require("express");
const app = express();
const authRouter = express.Router();
const studentModel = require("../models/student.model.js");

authRouter.get("/login", (req, res) => {
  res.send("login");
});

authRouter.post("/register", (req, res) => {
  let student = new studentModel(req.body);
  student
    .save()
    .then((success) => {
      res.status(200).json("Student Registered Successfully");
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

authRouter.get("/get", (req, res) => {});
module.exports = authRouter;
