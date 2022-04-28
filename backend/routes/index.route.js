const { Router } = require("express");
const router = Router();
const authRouter = require("./auth.route.js");

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/auth", authRouter);

module.exports = router;
