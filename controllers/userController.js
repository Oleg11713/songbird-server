const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, displayName, email, totalScoreForAllGames) => {
  return jwt.sign(
    { id, displayName, email, totalScoreForAllGames },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { displayName, email, password, totalScoreForAllGames } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Неверный логин или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      displayName,
      email,
      password: hashPassword,
      totalScoreForAllGames,
    });
    const token = generateJwt(
      user.id,
      user.displayName,
      user.email,
      user.totalScoreForAllGames
    );
    return res.json({ token });
  }

  async updateTotalScore(req, res) {
    const { email, totalScoreForAllGames } = req.body;
    const user = await User.update(
      { totalScoreForAllGames: totalScoreForAllGames },
      { where: { email } }
    );
    return res.json(user);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(
        ApiError.badRequest("Пользователя с таким email не существует")
      );
    }
    const comparePassword = await bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль"));
    }
    const token = generateJwt(
      user.id,
      user.displayName,
      user.email,
      user.totalScoreForAllGames
    );
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.displayName,
      req.user.email,
      req.user.totalScoreForAllGames
    );
    return res.json({ token });
  }

  async getAll(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }
}

module.exports = new UserController();
