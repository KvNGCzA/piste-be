/* eslint-disable */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  User.associate = (models) => {
    User.belongsToMany(models.Investment, {
      through: models.UserInvestment,
      foreignKey: 'userId'
    });
  };
  return User;
};
