import bcrypt from 'bcrypt';
import helpers from '../helpers';
import models from '../database/models';

const { responseMessage, createToken } = helpers;
const { User } = models;

export default class AuthController {
  static async signup(req, res, next) {
    try {
      // validate user existence
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return responseMessage({
          data: { message: 'a user with this email already exists' },
          status: 409,
          res
        });
      }
      // create user
      const { id } = await User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
      });
      return responseMessage({
        data: { message: 'done', token: createToken(id) },
        status: 200,
        res
      });
    } catch (error) {
      next(error);
    }
  }
}
