import helpers from '../helpers';
import models from '../database/models';

const { responseMessage, splitInvestments } = helpers;
const { User, UserInvestment, Investment } = models;

export default class UserController {
  static async calculateInvestmentOverview(req) {
    const user = await User.findByPk(req.userData.id);
    const investments = await user.getInvestments({
      attributes: [
        'id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate', 'status'
      ]
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
      networth: {
        totalAmountInvested,
        maturedReturns,
        total: networth
      },
      projected: {
        principle: totalAmountInvested,
        roi: totalROI,
        percentageROI: totalPercentageReturn || 0,
        numberOfInvestments: investments.length
      },
      active: {
        principle: investmentOnProjectedReturns,
        roi: projectedReturns,
        percentageROI: projectedPercentageReturn || 0,
        numberOfInvestments: numberOfProjectedInvestments
      },
      mature: {
        principle: investmentOnMatureReturns,
        roi: maturedReturns,
        percentageROI: maturePercentageReturn || 0,
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
      const query = {
        attributes: [
          'id', 'name', 'amountInvested', 'expectedReturnPercentage', 'returnDate', 'status'
        ],
        limit,
        offset,
        order: [['returnDate', 'desc']]
      };
      if (req.query.status) query.where = { status: req.query.status };
      let investments = await user.getInvestments(query);
      const result = {
        overview,
        meta: {
          page: +page,
          investmentsOnPage: investments.length
        }
      };
      if (!investments.length) {
        return responseMessage({
          data: { ...result, message: 'no additional investments to load' }, status: 400, res
        });
      }
      investments = splitInvestments([...investments]);
      return responseMessage({ data: { ...result, investments }, status: 200, res });
    } catch (error) {
      next(error);
    }
  }

  static async getAnInvestment(req, res, next) {
    const { userInvestment } = req;
    try {
      const investment = await userInvestment.getInvestment({
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
      delete req.body.id;
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
          investment: { ...editedInvestment, }
        },
        res,
        status: 200
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvestment(req, res, next) {
    try {
      const { userInvestment } = req;
      const investment = await userInvestment.getInvestment();
      await userInvestment.destroy();
      await investment.destroy();
      const overview = await UserController.calculateInvestmentOverview(req);
      return responseMessage({
        data: {
          message: `investment "${investment.name}" deleted successfully`,
          overview
        },
        res,
        status: 200
      });
    } catch (error) {
      next(error);
    }
  }
}
