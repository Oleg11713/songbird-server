const Router = require("express");

const gameRouter = require("./gameRouter");
const userRouter = require("./userRouter");

const router = new Router();

router.use("/signIn", userRouter);
router.use("/game", gameRouter);

module.exports = router;
