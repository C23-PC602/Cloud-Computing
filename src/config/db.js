import Sequelize from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();
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
export default db;
