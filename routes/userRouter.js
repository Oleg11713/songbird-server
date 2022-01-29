const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkForUpdateMiddleware = require("../middleware/checkForUpdateMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.patch(
  "/updateScore",
  checkForUpdateMiddleware,
  userController.updateTotalScore
);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
