const express = require("express");
const { nextTick } = require("process");
const app = express();
const adminRouter = express.Router();
const studentModel = require("../models/student.model.js");

adminRouter.get("/getstudents", (req, res) => {
  studentModel.find((err, students) => {
    if (err) {
      console.log(err);
    } else {
      res.json(students);
    }
  });
});

adminRouter.get("/getstudent/:id", (req, res) => {
  studentModel.findById(req.params.id, (err, student) => {
    res.json(student);
  });
});

adminRouter.get("/updatestudent/:id", (req, res) => {
  studentModel.findByIdAndUpdate(req.params.id, req.body, (err, student) => {
    if (!student) {
      return next(new Error("Unable to find Student with requested ID"));
    } else {
      student
        .save()
        .then((student) => {
          res.json({
            status: "Employee Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("Update Failed");
        });
    }
  });
});

adminRouter.get("/deletestudent/:id", (req, res) => {
  studentModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Deleted Successfully");
    }
  });
});

module.exports = adminRouter;