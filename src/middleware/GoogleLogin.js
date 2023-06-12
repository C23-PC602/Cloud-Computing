const googleLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ message: "Gagal Login" });
};

module.exports = { googleLogin };
