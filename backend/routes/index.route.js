const { Router } = require("express");
const router = Router();
const authRouter = require("./auth.route.js");
const adminRouter = require("./admin.route.js");

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/", authRouter);
router.use("/admin", adminRouter);

module.exports = router;
