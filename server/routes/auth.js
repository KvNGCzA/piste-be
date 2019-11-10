import express from 'express';
import AuthController from '../controllers/AuthController';

const user = express.Router();
const { signup, login } = AuthController;

const base = '/auth';

user.post(`${base}/signup`, signup);

user.post(`${base}/login`, login);

export default user;
