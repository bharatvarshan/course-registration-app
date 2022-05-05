const express = require("express");
const app = express();
const userRouter = express.Router();
const studentModel = require("../models/student.model.js");
const courseModel = require("../models/course.model.js");

userRouter.get("/profile", (req, res, next) => {
  res.json({
    message: "Secure profile Page",
    user: req.user,
    token: req.query.secret_token,
  });
  console.log(req.user);
});

userRouter.get("/list-courses", (req, res) => {
  courseModel.find((err, courses) => {
    if (err) {
      console.log(err);
    } else {
      res.json(courses);
    }
  });
});

userRouter.get("/list-course-by-category/:category", (req, res) => {
  courseModel.find({ category: req.params.category }, (err, course) => {
    res.json(course);
  });
});

userRouter.get("/:id/enroll-course", (req, res, next) => {
  studentModel.findByIdAndUpdate(
    req.params.id,
    { $push: { courses: req.body } },
    (err, student) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Course Enrolled");
      }
    }
  );
});
module.exports = userRouter;
