const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const passport = require("passport");
const authRoute = require("./routes/index");
const session = require("express-session");
var morgan = require("morgan");
require("dotenv").config();
require("./config/passport-setup");
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
// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT}`)
);
