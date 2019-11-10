import express from 'express';
import middlewares from '../middlewares';
import AuthController from '../controllers/AuthController';

const user = express.Router();
// const { TokenUtils } = middlewares;
// const { verifyToken } = TokenUtils;
const { signup } = AuthController;

const base = '/auth';

user.post(`${base}/signup`, signup);

export default user;
