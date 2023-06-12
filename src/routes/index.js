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
// const { verifyToken } = require("../middleware/verifyToken.js");
// const { refreshToken } = require("../controllers/refreshToken.js");
const { googleLogin } = require("../middleware/googleLogin.js");

// const router = express.Router();
// console.log(test);

// Get All user
// router.get("/users", verifyToken, getUsers);

// Manual Register
router.post("/register", register);

// Manual Login After Login
router.post("/login", login);

// Google Login
router.get("/google", loginWithGoogle);

// Google Login Callback
router.get("/google/callback", loginWithGoogleCallback);

// Protected Route After Google Login
router.get("/protected", googleLogin, protected);
router.get("/failure", failure);
// router.get("/protected", GoogleLogin, Protected);

// Get Refresh Token After token Expired
// router.get("/token", refreshToken);

// Test Route
router.get("/test", test);

// Logout
router.delete("/logout", logout);

module.exports = router;
