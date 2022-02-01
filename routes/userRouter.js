const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.patch(
  "/updateScore",
  authMiddleware(403, "Нет доступа"),
  userController.updateTotalScore
);
router.get(
  "/auth",
  authMiddleware(401, "Пользователь не авторизован"),
  userController.check
);

module.exports = router;
