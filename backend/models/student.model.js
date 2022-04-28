const { Schema, model } = require("mongoose");
const Course = require("./course.model.js");
const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "admin"],
    default: "student",
  },
  courses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: Course,
      },
      enrolled: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = model("Student", studentSchema);
