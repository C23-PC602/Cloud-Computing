import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/", (req, res) => res.status(200).send("ok"));
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
