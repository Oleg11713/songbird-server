const Router = require("express");
const router = new Router();

const gameController = require("../controllers/gameController");
const userController = require("../controllers/userController");

router.post("/addBird", gameController.create);
router.patch("/", userController.updateTotalScore);
router.get("/viewBirds", gameController.getAll);

module.exports = router;
