import helpers from '../helpers';
import models from '../database/models';

const { responseMessage } = helpers;
const { User, UserInvestment } = models;

export default class UserController {
  static async fetchAllUserInvestments(req, res, next) {
    try {
      const user = await User.findByPk(req.userData.id);
      const investments = await user.getInvestments({
        attributes: ['id', 'name', 'amountInvested', 'expectedReturn', 'returnDate']
      });
      return responseMessage({ data: { investments }, status: 200, res });
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
        attributes: ['id', 'name', 'amountInvested', 'expectedReturn', 'returnDate']
      });
      return responseMessage({ data: { investment }, status: 200, res });
    } catch (error) {
      next(error);
    }
  }
}
