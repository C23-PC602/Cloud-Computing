export const GoogleLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ message: "Gagal Login" });
};
