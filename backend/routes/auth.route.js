const { Router } = require("express");
const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.send("login");
});

module.exports = authRouter;
