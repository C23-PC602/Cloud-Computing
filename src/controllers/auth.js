const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
require("../config/passport-setup.js");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
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
  console.log(user.email);
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
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
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

const loginWithGoogle = (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};
const loginWithGoogleCallback = async (req, res, next) => {
  passport.authenticate(
    "google",
    {
      // successRedirect: "/auth/google/success",
      failureRedirect: "/auth/failure",
    },

    async (error, user, info) => {
      if (error) {
        return res.send({ message: error.message });
      }
      if (user) {
        try {
          // your success code
          return res.send({
            data: result.data,
            message: "Login Successful",
          });
        } catch (error) {
          // error msg
          return res.send({ message: error.message });
        }
      }
    }
  )(req, res, next);
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

const protected = async (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
};
const failure = async (req, res) => {
  res.send("Failed to authenticate..");
};

const test = async (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
};
// app.get("/protected", isLogged In, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });

module.exports = {
  protected,
  login,
  loginWithGoogle,
  loginWithGoogleCallback,
  register,
  getUsers,
  failure,
  test,
  logout,
};
