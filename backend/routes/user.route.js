const express = require("express");
const app = express();
const userRouter = express.Router();
const studentModel = require("../models/student.model.js");
const courseModel = require("../models/course.model.js");

const paymentController = require("../configs/payment.js");
let razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayConfig = {
  key_id: "rzp_test_yyPJDNR7iPgM94",
  key_secret: "Cbjzg0sJdH6NFCL5H3JmzkPf",
};

// var instance = new razorpay(razorpayConfig);
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

userRouter.post("/payment/create-order", async (req, res, next) => {
  const amount = req.body.price;
  var instance = new razorpay({
    key_id: razorpayConfig.key_id,
    key_secret: razorpayConfig.key_secret,
  });
  let order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  });
  console.log(order);

  res.send(order);
});
userRouter.post("/payment/verifyPaymentSignature", (req, res, next) => {
  const order_id = req.body.order_id;
  const payment_id = req.body.payment_id;
  const razorpay_signature = req.body.signature;

  const key_secret = "Cbjzg0sJdH6NFCL5H3JmzkPf";

  let hmac = crypto.createHmac("sha256", key_secret);

  hmac.update(order_id + "|" + payment_id);

  const generated_signature = hmac.digest("hex");

  if (razorpay_signature === generated_signature) {
    console.log("verified");
    res.json("Verified");
  } else return res.send("Failed");
});

module.exports = userRouter;
