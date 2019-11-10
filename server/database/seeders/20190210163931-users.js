import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    firstName: 'Simon',
    lastName: 'Taylor',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'simontaylor@panelfinancial.com',
    country: 'Nigeria',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '122b0f86-8e78-5cc8-a28f-8e9f7811c457',
    firstName: 'Test-Super',
    lastName: 'Admin',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'superadmin@panelfinancial.com',
    country: 'America',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '133b0f86-8e78-3bb4-a28f-8e9f7811c457',
    firstName: 'Test',
    lastName: 'Admin',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'admin@panelfinancial.com',
    country: 'Ghana',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '144b0f86-8e78-3bb4-a28f-8e9f7811c489',
    firstName: 'Test',
    lastName: 'Employee',
    password: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`,
    email: 'employee@panelfinancial.com',
    country: 'Nigeria',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
