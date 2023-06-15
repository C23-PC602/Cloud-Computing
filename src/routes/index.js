import express from "express";
import { profile, register, login, logout } from "../controllers/auth.js";
import verifyToken from "../middleware/verifyToken.js";
import refreshToken from "../controllers/refreshToken.js";
const router = express.Router();

// Get All user
router.get("/profile", verifyToken, profile);

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

export default router;
