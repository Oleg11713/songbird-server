const Router = require("express");

const gameRouter = require("./birdRouter");
const userRouter = require("./userRouter");

const router = new Router();

router.use("/user", userRouter);
router.use("/bird", gameRouter);

module.exports = router;
