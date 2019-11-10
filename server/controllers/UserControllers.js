import bcrypt from 'bcrypt';
import helpers from '../helpers';
import models from '../database/models';

const { responseMessage } = helpers;
const { User } = models;

export default class UserControllers {
  static async updatePass(req, res, next) {
    const { userData: { password: oldPass, id }, body: { password } } = req;
    try {
      const compare = await bcrypt.compare(password, oldPass);
      if (compare) {
        return responseMessage({ message: 'you have used this password before' }, 400, res);
      }
      await User.update(
        { password: bcrypt.hashSync(password, 10), passUpdated: true }, { where: { id } }
      );
      return responseMessage({ message: 'password updated successfully' }, 201, res);
    } catch (error) {
      /* istanbul ignore next-line */
      next(error);
    }
  }
}
