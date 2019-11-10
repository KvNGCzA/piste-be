import express from 'express';
import middlewares from '../middlewares';
import UserControllers from '../controllers/UserControllers';

const user = express.Router();
// const { TokenUtils } = middlewares;
// const { verifyToken } = TokenUtils;
// const { updatePass } = UserControllers;

const base = '/user';

user.get(`${base}/myaccount`);

export default user;
