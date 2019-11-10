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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // find user
      const user = await User.findOne({ where: { email } });
      // confirm password
      const confirmUser = user ? await bcrypt.compare(password, user.password) : false;
      if (!confirmUser) {
        return responseMessage({
          data: { message: 'email/password do not match' },
          status: 400,
          res
        });
      }
      return responseMessage({
        data: { message: 'login successful', token: createToken(user.id) },
        status: 200,
        res
      })
    } catch (error) {
      next(error);
    }
  }
}
