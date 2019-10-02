import Sequelize from "sequelize";
import path from "path";
import fs from "fs";

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    define: {
      freezeTableName: true
    }
  }
);

let models = {}
fs.readdirSync(path.join(__dirname, "models"))
  .filter(file => {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach(filename => {
    let model = require(path.join(__dirname, "models", filename)).default
    model.init(sequelize)
    models[model.name] = model; // key as modelName
  });

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log("tables have been created");
});

// import UserModel from './models/User';
// const User = UserModel(sequelize, Sequelize);
// db['User'] = User
module.exports = {
  ...models, sequelize
}
