// Dependencies
const Sequelize = require("sequelize");
const { sql } = require("./config");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize(sql.database, sql.username, sql.password, {
  host: sql.host,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;