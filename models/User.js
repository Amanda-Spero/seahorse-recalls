const sequelize = require("sequelize");
const connection = require("../config/connection");

const user = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
};

const indexes = [
  {
    unique: true,
    fields: ['email']
  }
];

const User = connection.define("user", user, indexes);
User.sync();

module.exports = User;