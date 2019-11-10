export default {
  up: queryInterface => queryInterface.bulkInsert('Investments', [{
    id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    name: 'PiggyVest Rice Farm',
    amountInvested: 1000000,
    expectedReturn: 20,
    returnDate: '20-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '122a0d87-8b78-4bb8-b28f-8e5f7811c456',
    name: 'PiggyVest Chicken Farm',
    amountInvested: 100000,
    expectedReturn: 20,
    returnDate: ' 27-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '124a0d86-8b78-4cb8-b28f-8e5f7811c456',
    name: 'PiggyVest Soybean Farm',
    amountInvested: 2000000,
    expectedReturn: 30,
    returnDate: '12-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '122a0b86-8b78-4cb8-b28f-8e4f7811c456',
    name: 'Afri Invest Mutual Fund',
    amountInvested: 1000000,
    expectedReturn: 25,
    returnDate: '22-12-2019',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Investments', null, {})
};
