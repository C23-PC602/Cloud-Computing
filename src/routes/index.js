import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  LoginWithGoogle,
  LoginWithGoogleCallback,
  Protected,
  Test,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { GoogleLogin } from "../middleware/GoogleLogin.js";

const router = express.Router();

// Get All user
router.get("/users", verifyToken, getUsers);

// Manual Register
router.post("/register", Register);

// Manual Login After Login
router.post("/login", Login);

// Google Login
router.get("/login-google", LoginWithGoogle);

// Google Login Callback
router.get("/login-google/callback", LoginWithGoogleCallback);

// Protected Route After Google Login
router.get("/protected", GoogleLogin, Protected);

// Get Refresh Token After token Expired
router.get("/token", refreshToken);

// Test Route
router.get("/test", Test);

// Logout
router.delete("/logout", Logout);

export default router;
