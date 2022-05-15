const express = require("express");
const app = express();
const authRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model.js");

// authRouter.post(
//   "/signup",
//   passport.authenticate("signup", { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       user: req.user,
//     });
//   }
// );

// authRouter.post("/login1", (req, res) => {
//   res.json("Hello");
// });

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(err);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60,
        });
        passport.serializeUser(function (user, done) {
          done(null, user.id);
        });
        return res.send({ token: token, user: user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// authRouter.get("/login", (req, res) => {
//   res.send("login");
// });

authRouter.post("/signup", (req, res) => {
  let student = new studentModel(req.body);
  student
    .save()
    .then((success) => {
      res
        .status(200)
        .json({ message: "Student Registered Successfully", user: req.user });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

module.exports = authRouter;
