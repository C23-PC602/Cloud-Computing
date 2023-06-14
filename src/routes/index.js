const router = require("express").Router();
const {
  getUsers,
  register,
  login,
  logout,
  loginWithGoogle,
  loginWithGoogleCallback,
  protected,
  test,
  failure,
} = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const { refreshToken } = require("../controllers/refreshToken.js");

// Get All user
router.get("/profile", verifyToken, getUsers);

// Manual Register
router.post("/register", register);

// Manual Login After Login
router.post("/login", login);

// Get Refresh Token After token Expired
router.get("/token", refreshToken);
router.get("/test", (req, res) => {
  res.send({ meessage: "oke" });
});

// Logout
router.delete("/logout", logout);

module.exports = router;
