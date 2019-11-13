/* eslint-disable */
export default (sequelize, DataTypes) => {
  const UserInvestment = sequelize.define('UserInvestment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    investmentId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }, {});
  UserInvestment.associate = (models) => {
    UserInvestment.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    UserInvestment.belongsTo(models.Investment, {
      foreignKey: 'investmentId',
      onDelete: 'cascade'
    })
  };
  return UserInvestment;
};
