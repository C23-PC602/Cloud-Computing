import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASS,
  {
    host: process.env.DBSERVER,
    dialect: "mysql",
  }
);

console.log(process.env.DBNAME);
console.log(process.env.DBPASS);
console.log(process.env.DBNAME);
console.log(process.env.DBNAME);
export default db;
