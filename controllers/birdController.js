const { Bird } = require("../models/birdModel");

class BirdController {
  async getAll(req, res) {
    const bird = await Bird.findAll();
    return res.json(bird);
  }
}

module.exports = new BirdController();
