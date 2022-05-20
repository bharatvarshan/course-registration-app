const express = require("express");
const app = express();
const authRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model.js");
const refreshTokenModel = require("../models/refreshToken.model.js");
const bcrypt = require("bcrypt");

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
        res.status(400).json({
          message: "User does not exist with this email (or) password",
        });
        return next(err);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }
        const body = { email: user._id };
        let token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: 30,
        });
        let refreshToken = jwt.sign({ user: body }, "REFRESH_SECRET", {
          expiresIn: "1d",
        });
        const ref_token = new refreshTokenModel({
          refreshToken: refreshToken,
        });
        await ref_token.save();
        // token = secretToken + " " + refreshToken;
        return res.send({
          token: token,
          user: user,
          refresh_token: ref_token.refreshToken,
        });
      });
    } catch (error) {
      return next(error);
      res.status(400).json({ message: "Error Occured" });
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
      res.status(200).json({ message: "User Registered Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "User Already Exist" });
    });
});

authRouter.post("/auth/refreshtoken", (req, res) => {
  //get refreshToken
  console.log(req.body.refresh_token);
  try {
    const refreshToken = req.body.refresh_token;
    //send error if no refreshToken is sent
    console.log("hii", refreshToken);

    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied,token missing!" });
    } else {
      //query for the token to check if it is valid:
      console.log("hii", refreshToken);

      const tokenDoc = refreshTokenModel.findOne({
        refreshToken: refreshToken,
      });

      tokenFromDB = tokenDoc._conditions.refreshToken;
      //send error if no token found:
      console.log("helli", tokenFromDB);
      if (!tokenFromDB) {
        return res.status(401).json({ error: "Token expired!" });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(tokenFromDB, "REFRESH_SECRET");
        console.log(payload);
        const accessToken = jwt.sign({ user: req.body.userId }, "TOP_SECRET", {
          expiresIn: "60m",
        });
        return res
          .status(200)
          .json({ access_token: accessToken, refresh_token: tokenFromDB });
      }
    }
  } catch (error) {
    console.error("Eroor ", error);
    if (error == "TokenExpiredError: jwt expired") {
      return res.status(500).json({ error: "Token Expired" });
    }
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = authRouter;
