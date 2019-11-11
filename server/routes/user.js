import express from 'express';
import middlewares from '../middlewares';
import UserControllers from '../controllers/UserController';

const user = express.Router();
const { TokenUtils, VerifyOwnership } = middlewares;
const { verifyToken } = TokenUtils;
const {
  fetchAllUserInvestments,
  getAnInvestment,
  myInvestmentOverview,
  addInvestment,
  updateInvestment
} = UserControllers;

const base = '/user';

user.post(`${base}/investment`, verifyToken, addInvestment);

user.put(`${base}/investment/:investmentId`, verifyToken, VerifyOwnership, updateInvestment);

user.get(`${base}/myinvestments`, verifyToken, fetchAllUserInvestments);

user.get(`${base}/myoverview`, verifyToken, myInvestmentOverview);

user.get(`${base}/investment/:investmentId`, verifyToken, VerifyOwnership, getAnInvestment);

export default user;
