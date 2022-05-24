const express = require("express");
const app = express();
const authRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model.js");
const refreshTokenModel = require("../models/refreshToken.model.js");
const bcrypt = require("bcrypt");
const TwoFactor = new (require("2factor"))(
  "3975edbd-690f-11eb-8153-0200cd936042"
);

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
          expiresIn: 60,
        });
        let refreshToken = jwt.sign({ user: body }, "REFRESH_SECRET", {
          expiresIn: "1y",
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

authRouter.post("/signup", async (req, res) => {
  let student = new studentModel(req.body);
  student.password = await bcrypt.hash(student.password, 10);
  console.log(student.password);
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

authRouter.get("/otp/get-balance", (req, res, next) => {
  TwoFactor.balance().then(
    (response) => {
      console.log(response);
      res.send(response);
    },
    (error) => {
      console.log(error);
    }
  );
});

authRouter.post("/otp/send-otp", (req, res, next) => {
  console.log(req.body);
  TwoFactor.sendOTP("9703681102", {
    otp: Math.floor(1000 + Math.random() * 9000),
    template: "RECMart",
  }).then(
    (sessionID) => {
      res.send(sessionID);
      // console.log(sessionId);
    },
    (error) => {
      console.log(error);
    }
  );
});

authRouter.get("/otp/verify-otp", (req, res, next) => {
  TwoFactor.verifyOTP(req.body.id, req.body.otp).then(
    (response) => {
      res.send(response);
      console.log(response);
    },
    (error) => {
      res.send(error);
      console.log(error);
    }
  );
});

authRouter.post("/reset-password", async (req, res) => {
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;
  // let student = new studentModel(req.body);

  // console.log(student);
  let hashedPassword = await bcrypt.hash(inputPassword, 10);
  console.log(hashedPassword);

  try {
    studentModel.findOneAndUpdate(
      { email: inputEmail },
      { password: hashedPassword },
      (err, user) => {
        // console.log(user);
        if (!user) {
          res.send("User Not Found");
        } else {
          res.json({
            status: "Password updated Successfully",
          });
        }
      }
    );
    // studentModel.updateOne({emailId:user.email},{$set:{password: bcrypt.hash(pwd,10)}})

    // console.log(curuser.password);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = authRouter;
