const Router = require("express");
const router = new Router();
const gameRouter = require("./gameRouter");
const userRouter = require("./userRouter");

router.use("/signIn", userRouter);
router.use("/", gameRouter);
    
module.exports = router;
