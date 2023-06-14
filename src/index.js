const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const authRoute = require("./routes/index");
var morgan = require("morgan");
require("dotenv").config();
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

app.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT}`)
);
