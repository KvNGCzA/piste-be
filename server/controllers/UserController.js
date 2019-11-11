import helpers from '../helpers';
import models from '../database/models';

const { responseMessage } = helpers;
const { User, UserInvestment, Investment } = models;

// [Sequelize.fn('sum', Sequelize.col('amountInvested')), 'total']

export default class UserController {
  static async calculateInvestmentOverview(req) {
    const user = await User.findByPk(req.userData.id);
    const investments = await user.getInvestments({
      attributes: [
        'id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate', 'status'
      ],
    });
    let totalAmountInvested = 0;
    let investmentOnProjectedReturns = 0;
    let investmentOnMatureReturns = 0;
    let totalROI = 0;
    let projectedReturns = 0;
    let maturedReturns = 0;
    let numberOfProjectedInvestments = 0;
    let numberOfMaturedInvestments = 0;
    investments.map((investment) => {
      totalAmountInvested += investment.amountInvested;
      const roi = investment.amountInvested * (investment.expectedReturnPercentage / 100);
      totalROI += roi;
      if (investment.status === 'active') {
        projectedReturns += roi;
        investmentOnProjectedReturns += investment.amountInvested;
        numberOfProjectedInvestments += 1;
      }
      if (investment.status === 'mature') {
        maturedReturns += roi;
        investmentOnMatureReturns += investment.amountInvested;
        numberOfMaturedInvestments += 1;
      }
      return null;
    });
    const totalPercentageReturn = (100 / totalAmountInvested) * totalROI;
    const projectedPercentageReturn = (100 / investmentOnProjectedReturns) * projectedReturns;
    const maturePercentageReturn = (100 / investmentOnMatureReturns) * maturedReturns;
    const networth = totalAmountInvested + maturedReturns;
    return {
      networth,
      total: {
        principle: totalAmountInvested,
        roi: totalROI,
        precentageROI: totalPercentageReturn,
        numberOfInvestments: investments.length
      },
      projected: {
        principle: investmentOnProjectedReturns,
        roi: projectedReturns,
        precentageROI: projectedPercentageReturn,
        numberOfInvestments: numberOfProjectedInvestments
      },
      mature: {
        principle: investmentOnMatureReturns,
        roi: maturedReturns,
        precentageROI: maturePercentageReturn,
        numberOfInvestments: numberOfMaturedInvestments
      }
    };
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
        attributes: [
          'id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate', 'status'
        ],
        limit,
        offset
      });
      const result = { overview, meta: { page: +page, investmentsOnPage: investments.length } };
      if (!investments.length) {
        return responseMessage({
          data: { ...result, message: 'no additional investments to load' }, status: 400, res
        });
      }
      return responseMessage({ data: { ...result, investments }, status: 200, res });
    } catch (error) {
      next(error);
    }
  }

  static async getAnInvestment(req, res, next) {
    const { investmentId } = req.params;
    try {
      const investment = await Investment.findByPk(investmentId, {
        attributes: [
          'id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate', 'status'
        ],
        raw: true
      });
      const totalReturnOnInvestment = investment.amountInvested * (investment.expectedReturnPercentage / 100);
      return responseMessage({
        data: {
          investment: { ...investment, totalReturnOnInvestment }
        },
        status: 200,
        res
      });
    } catch (error) {
      next(error);
    }
  }

  static async addInvestment(req, res, next) {
    try {
      const user = await User.findByPk(req.userData.id);
      const {
        roi: { type, value }, amountInvested, returnDate, name
      } = req.body;
      const expectedReturnPercentage = type === 'percentage'
        ? value : value / (amountInvested / 100);
      const totalReturnOnInvestment = type !== 'percentage'
        ? value : (value / 100) * amountInvested;
      const investment = await Investment.create({
        ...req.body,
        expectedReturnPercentage,
        status: 'active'
      });
      await user.addInvestment(investment);
      const overview = await UserController.calculateInvestmentOverview(req);
      return responseMessage({
        data: {
          overview,
          investment: {
            id: investment.id,
            name,
            amountInvested,
            expectedReturnPercentage,
            returnDate,
            status: 'active',
            totalReturnOnInvestment
          }
        },
        res,
        status: 201
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInvestment(req, res, next) {
    try {
      const { roi: { type, value }, amountInvested } = req.body;
      const expectedReturnPercentage = type === 'percentage'
        ? value : value / (amountInvested / 100);
      const totalReturnOnInvestment = type !== 'percentage'
        ? value : (value / 100) * amountInvested;
      const [rowsUpdated, investment] = await Investment.update({
        ...req.body,
        expectedReturnPercentage
      }, {
        where: { id: req.params.investmentId },
        returning: true,
        plain: true,
        raw: true,
      });
      const overview = await UserController.calculateInvestmentOverview(req);
      const editedInvestment = { ...investment };
      delete editedInvestment.updatedAt;
      delete editedInvestment.createdAt;
      return responseMessage({
        data: {
          message: 'record updated successfully',
          overview,
          investment: { ...editedInvestment, totalReturnOnInvestment }
        },
        res,
        status: 200
      });
    } catch (error) {
      next(error);
    }
  }
}
