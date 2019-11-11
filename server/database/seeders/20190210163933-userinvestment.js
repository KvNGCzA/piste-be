export default {
  up: queryInterface => queryInterface.bulkInsert('UserInvestments', [{
    userId: '122a0c86-8b78-4ba8-b28f-8e5f7811c256',
    investmentId: '122a0d76-8b78-4bb8-b28f-8e5f7211c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b28f-8e5f7811c256',
    investmentId: '122a4b87-8b78-4bb8-b2bf-8e5f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b28f-8e5f7811c256',
    investmentId: '122a4c87-8b48-4bb8-b27f-8e5f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b28f-8e5f7811c256',
    investmentId: '152a1b86-8b78-4cb8-b28f-8e4f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b27f-8e5f7821c256',
    investmentId: '153a1b86-8b78-4cb8-b28f-8e4f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b27f-8e5f7821c256',
    investmentId: '153a1b86-8b78-3ab8-b28f-8e2f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: '122a0c86-8b78-4ba8-b27f-8e5f7821c256',
    investmentId: '153a1c86-8b78-3ab8-b28f-8e2f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserInvestments', null, {})
};
