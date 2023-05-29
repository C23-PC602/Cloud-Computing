import { Sequelize } from "sequelize";

const db = new Sequelize("2023_bangkit", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
