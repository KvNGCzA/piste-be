/* eslint-disable */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Investments', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    amountInvested: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    expectedReturn: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    returnDate: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Investments')
};
