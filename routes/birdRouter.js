const Router = require("express");
const router = new Router();

const gameController = require("../controllers/birdController");

router.get("/viewBirds", gameController.getAll);

module.exports = router;
