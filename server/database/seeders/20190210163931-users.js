import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    id: '122a0c86-8b78-4ba8-b28f-8e5f7811c256',
    firstName: 'Chris',
    lastName: 'Akanmu',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'chris@yahoo.com',
    country: 'Nigeria',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: '122a0c86-8b78-4ba8-b27f-8e5f7821c256',
    firstName: 'James',
    lastName: 'Doe',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'james@yahoo.com',
    country: 'USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
