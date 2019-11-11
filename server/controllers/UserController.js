import helpers from '../helpers';
import models from '../database/models';
import Sequelize from 'sequelize';

const { responseMessage } = helpers;
const { User, UserInvestment } = models;

// [Sequelize.fn('sum', Sequelize.col('amountInvested')), 'total']

export default class UserController {
  static async calculateInvestmentOverview(req) {
    const user = await User.findByPk(req.userData.id);
    const investments = await user.getInvestments({
      attributes: ['id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate'],
    });
    let totalAmountInvested = 0, totalReturnOnInvestment = 0;
    investments.map((investment) => {
      totalAmountInvested += investment.amountInvested ;
      totalReturnOnInvestment += investment.amountInvested * (investment.expectedReturnPercentage/100)
    });
    const projectedPercentageReturn = (100/totalAmountInvested) * totalReturnOnInvestment;
    const networth = totalAmountInvested + totalReturnOnInvestment;
    return { numberOfInvestments: investments.length, totalAmountInvested, totalReturnOnInvestment, projectedPercentageReturn, networth };
  }

  static async myInvestmentOverview(req, res, next) {
    try {
      const data = await UserController.calculateInvestmentOverview(req);
      return responseMessage({ data, status: 200, res });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllUserInvestments(req, res, next) {
    try {
      const overview = await UserController.calculateInvestmentOverview(req);
      const user = await User.findByPk(req.userData.id);
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (+page - 1) * +limit;
      const investments = await user.getInvestments({
        attributes: ['id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate'],
        limit,
        offset
      });
      const result = { overview, meta: { page: +page, investmentsOnPage: investments.length } };
      if (!investments.length) {
        return responseMessage({ data: { ...result, message: 'no additional investments to load' }, status: 400, res })
      }
      return responseMessage({ data: { ...result, investments }, status: 200, res });
    } catch (error) {
      next(error);
    }
  }

  static async getAnInvestment(req, res, next) {
    const { investmentId } = req.params;
    try {
      let investment = await UserInvestment.findOne({ where: { investmentId }});
      if (!investment || req.userData.id !== investment.userId) {
        return responseMessage({ data: { message: 'this investment does not exist or does not belong to you' }, status: 400, res });
      }
      investment = await investment.getInvestment({
        attributes: ['id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate'],
        raw: true
      });
      const totalReturnOnInvestment = investment.amountInvested * (investment.expectedReturnPercentage/100);
      return responseMessage({ data: { ...investment, totalReturnOnInvestment }, status: 200, res });
    } catch (error) {
      next(error);
    }
  }
}
