import helpers from '../helpers';
import models from '../database/models';

const { responseMessage } = helpers;
const { User } = models;

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
}
