const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const ApiError = require("../error/ApiError");

const SALT = 5;

const generateJwt = (id, displayName, email, totalScoreForAllGames) => {
  return jwt.sign(
    { id, displayName, email, totalScoreForAllGames },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const INITIAL_TOTAL_SCORE = 0;
    const { displayName, email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Неверный логин или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const passwordHash = await bcrypt.hash(password, SALT);
    const user = await User.create({
      displayName,
      email,
      password: passwordHash,
      totalScoreForAllGames: INITIAL_TOTAL_SCORE,
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
}

module.exports = new UserController();
