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
    expectedReturnPercentage: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    returnDate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Investment.associate = (models) => {
    Investment.belongsToMany(models.User, {
      through: models.UserInvestment,
      foreignKey: 'investmentId',
      onDelete: 'cascade'
    });
  };
  return Investment;
};
