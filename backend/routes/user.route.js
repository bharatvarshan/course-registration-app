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

userRouter.get("/enrollments/:id", (req, res) => {
  studentModel.findById(req.params.id, (err, student) => {
    if (err) throw err;
    if (student.courses == null) {
      res.send("[]");
    } else {
      res.json(student.courses);
    }
  });
});

userRouter.get("/:id/enroll-course/:courseid", (req, res, next) => {
  studentModel.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { courses: req.params.courseid } },
    (err, student) => {
      if (err) {
        console.log(err);
      } else if (!student) {
        res.json("No User available");
      } else {
        res.json(student);
      }
    }
  );
});

module.exports = userRouter;
