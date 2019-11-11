import express from 'express';
import middlewares from '../middlewares';
import UserControllers from '../controllers/UserController';

const user = express.Router();
const { TokenUtils } = middlewares;
const { verifyToken } = TokenUtils;
const {
  fetchAllUserInvestments,
  getAnInvestment,
  myInvestmentOverview,
  addInvestment
} = UserControllers;

const base = '/user';

user.post(`${base}/newinvestment`, verifyToken, addInvestment);

user.get(`${base}/myinvestments`, verifyToken, fetchAllUserInvestments);

user.get(`${base}/myoverview`, verifyToken, myInvestmentOverview);

user.get(`${base}/investment/:investmentId`, verifyToken, getAnInvestment);

export default user;
