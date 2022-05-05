const { Schema, model } = require("mongoose");

const courseSchema = Schema({
  courseName: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "App Development", "Cloud", "Cyber Security"],
  },
  studentsEnrolled: {
    type: Number,
  },
});

module.exports = model("Course", courseSchema);
