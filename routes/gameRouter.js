const Router = require("express");
const router = new Router();
const gameController = require("../controllers/gameController");
const userController = require("../controllers/userController");

router.post("/", gameController.create);
router.patch("/", userController.updateTotalScore);
router.get("/", gameController.getAll);

module.exports = router;
