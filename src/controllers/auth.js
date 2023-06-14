const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  return res.send({
    message: "Authentication Success",
    profile: req.app.locals.credential,
  });
};

const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email dan Password tidak boleh kosong" });
  }
  const userAvailable = await Users.findOne({ where: { email: email } });
  if (userAvailable) {
    return res.status(403).send({ message: "Email sudah digunakan" });
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ message: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email dan Password tidak boleh kosong" });
  }
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Email atau Password Salah" });
  try {
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: "Email atau Password Salah" });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(204).send({ message: "Gagal Logout" });
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  // console.log(user);
  if (!user) return res.status(400).send({ message: "Gagal Logout" });
  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).send({ message: "Berhasil Logout" });
};

module.exports = {
  login,
  register,
  getUsers,
  logout,
};
