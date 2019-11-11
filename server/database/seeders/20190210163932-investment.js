export default {
  up: queryInterface => queryInterface.bulkInsert('Investments', [{
    id: '122a0d76-8b78-4bb8-b28f-8e5f7211c456',
    name: 'PiggyVest Rice Farm',
    amountInvested: 1000000,
    expectedReturn: 20,
    returnDate: '20-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '122a4b87-8b78-4bb8-b2bf-8e5f7811c456',
    name: 'PiggyVest Chicken Farm',
    amountInvested: 100000,
    expectedReturn: 20,
    returnDate: ' 27-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '122a4c87-8b48-4bb8-b27f-8e5f7811c456',
    name: 'PiggyVest Soybean Farm',
    amountInvested: 2000000,
    expectedReturn: 30,
    returnDate: '12-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '152a1b86-8b78-4cb8-b28f-8e4f7811c456',
    name: 'Afri Invest Mutual Fund',
    amountInvested: 1000000,
    expectedReturn: 25,
    returnDate: '22-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '153a1b86-8b78-4cb8-b28f-8e4f7811c456',
    name: 'Afri Invest Mutual Fund',
    amountInvested: 1200000,
    expectedReturn: 25,
    returnDate: '22-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Investments', null, {})
};
