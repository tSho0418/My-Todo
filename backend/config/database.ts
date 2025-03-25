import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "database",
  username: "tasuno",
  password: "Showno0418",
  host: "localhost",
  dialect: "sqlite", 
});

export default sequelize;