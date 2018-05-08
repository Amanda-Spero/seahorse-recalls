const sequelize = require("sequelize");
const connection = require("../config/connection");

const user = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  globalUserId: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
  },
};

const indexes = [
  {
    unique: true,
    fields: ['email'],
  },
  {
    fields: ['globalId'],
  },
];

const User = connection.define("user", user, indexes);
User.sync();

module.exports = User;