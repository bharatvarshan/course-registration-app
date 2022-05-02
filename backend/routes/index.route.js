const { Router } = require("express");
const router = Router();
const passport = require("passport");
const authRouter = require("./auth.route.js");
const adminRouter = require("./admin.route.js");
const userRouter = require("./user.route");

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/", authRouter);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
router.use("/admin", adminRouter);

module.exports = router;
