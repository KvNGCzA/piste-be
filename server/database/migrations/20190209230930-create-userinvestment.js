/* eslint-disable */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserInvestments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    investmentId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Investments',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('UserInvestments')
};
