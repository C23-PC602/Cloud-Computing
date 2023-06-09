import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

// ini juga
import Users from "./models/UserModel.js";
import passport from "passport";
dotenv.config();
const app = express();
app.use(passport.initialize());
// app.use(passport.session());

try {
  await db.authenticate();
  console.log("Database Connected...");

  // aktifkan ini jika mau migrasi database
  await Users.sync();
} catch (error) {
  console.error(error);
}

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", router);

app.listen(5000, () => console.log("Server running at port 5000"));
