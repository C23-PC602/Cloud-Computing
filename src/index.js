import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db.js";
import authRoute from "./routes/index.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("combined"));

const authDB = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");
    // aktifkan ini jika mau migrasi database
    // await Users.sync();
  } catch (error) {
    console.error(error);
  }
};
authDB();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/", (req, res) => {
  res.send({ message: "Authentication Detection Coffee API" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT}`)
);
