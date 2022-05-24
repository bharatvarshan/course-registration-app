const { Schema, model } = require("mongoose");
const { URL } = require("url");

const courseSchema = Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  courseShortDescription: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  studentsEnrolled: {
    type: Number,
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Professional"],
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = model("Course", courseSchema);
