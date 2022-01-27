const { Bird } = require("../models/birdModel");

class GameController {
  async create(req, res) {
    const { id, name, species, description, image, audio } = req.body;
    const bird = await Bird.create({
      id,
      name,
      species,
      description,
      image,
      audio,
    });
    return res.json(bird);
  }

  async getAll(req, res) {
    const bird = await Bird.findAll();
    return res.json(bird);
  }
}

module.exports = new GameController();
