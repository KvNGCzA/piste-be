import model from '../database/models';
import helpers from '../helpers';

const { responseMessage } = helpers;

export default async (req, res, next) => {
  const { investmentId } = req.params;
  try {
    const investment = await model.UserInvestment.findOne({ where: { investmentId } });
    if (!investment || req.userData.id !== investment.userId) {
      return responseMessage({
        data: {
          message: 'this investment does not exist or does not belong to you'
        },
        status: 400,
        res
      });
    }
    req.userInvestment = investment;
    next();
  } catch (error) {
    next(error);
  }
};
