module.exports = (sequelize, DataTypes) => {
  const user = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    globalUserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    enableNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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

  const User = sequelize.define('user', user, indexes);

  return User;
};
