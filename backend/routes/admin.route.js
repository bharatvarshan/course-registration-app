const express = require("express");

const app = express();
const adminRouter = express.Router();
const studentModel = require("../models/student.model.js");
const courseModel = require("../models/course.model.js");

adminRouter.get("/get-students", (req, res) => {
  studentModel.find((err, students) => {
    if (err) {
      console.log(err);
    } else {
      res.json(students);
    }
  });
});

adminRouter.get("/get-student/:id", (req, res) => {
  studentModel.findById(req.params.id, (err, student) => {
    res.json(student);
  });
});

adminRouter.post("/update-student/:id", (req, res) => {
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

adminRouter.get("/delete-student/:id", (req, res) => {
  studentModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Deleted Successfully");
    }
  });
});

// Course Details

adminRouter.post("/add-course", (req, res) => {
  let course = new courseModel(req.body);
  course
    .save()
    .then((success) => {
      res.status(200).json("Course Added Successfully");
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

adminRouter.get("/get-courses", (req, res) => {
  courseModel.find((err, courses) => {
    if (err) {
      console.log(err);
    } else {
      res.json(courses);
    }
  });
});

adminRouter.get("/get-course/:id", (req, res) => {
  courseModel.findById(req.params.id, (err, course) => {
    res.json(course);
  });
});

adminRouter.get("/get-courseByName/:name", (req, res) => {
  courseModel.findOne({ courseName: req.params.name }, (err, course) => {
    res.json(course);
  });
});

adminRouter.post("/update-course/:id", (req, res) => {
  courseModel.findByIdAndUpdate(req.params.id, req.body, (err, course) => {
    if (!course) {
      return next(new Error("Unable to find course with requested ID"));
    } else {
      course
        .save()
        .then((course) => {
          res.json({
            status: "Course Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("Update Failed");
        });
    }
  });
});

adminRouter.get("/delete-course/:id", (req, res) => {
  courseModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Course Deleted Successfully");
    }
  });
});

adminRouter.get("/get-categories", (req, res, next) => {
  courseModel.find({}, function (err, categories) {
    var categoryMap = {};
    var categoryList = [];

    categories.forEach(function (course) {
      categoryMap[course.category] = categoryList.push(course);
      // categoryList.push(course.category);
    });
    res.json(categoryMap);
    // res.send([...new Set(categoryList)]);
  });
});
module.exports = adminRouter;
