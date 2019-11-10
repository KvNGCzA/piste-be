/* eslint-disable */
export default (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    amountInvested: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    expectedReturn: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    returnDate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Investment.associate = (models) => {
  };
  return Investment;
};
