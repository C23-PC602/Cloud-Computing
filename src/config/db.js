const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");
const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASS,
  {
    dialectModule: mysql2,
    host: process.env.DBSERVER,
    dialect: "mysql",
  }
);

module.exports = db;
