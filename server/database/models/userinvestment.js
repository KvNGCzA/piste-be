/* eslint-disable */
export default (sequelize, DataTypes) => {
  const UserInvestment = sequelize.define('UserInvestment', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
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
      foreignKey: 'userId',
      as: 'user'
    })
  };
  return UserInvestment;
};
