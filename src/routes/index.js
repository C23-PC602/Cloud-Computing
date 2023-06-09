import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  LoginWithGoogle,
  LoginWithGoogleCallback,
  Protected,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { GoogleLogin } from "../middleware/GoogleLogin.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.post("/login-google", LoginWithGoogle);
router.post("/login-google/callback", LoginWithGoogleCallback);
router.post("/protected", GoogleLogin, Protected);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
