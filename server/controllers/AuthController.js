import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import helpers from '../helpers';
import models from '../database/models';
import UserController from './UserController';

const { responseMessage, createToken } = helpers;
const { User } = models;

export default class AuthController {
  static async signup(req, res, next) {
    try {
      // validate user existence
      const existingUser = await User.findOne({
        where: { email: { [Op.iLike]: `%${req.body.email}%` } }
      });
      if (existingUser) {
        return responseMessage({
          data: { message: 'a user with this email already exists' },
          status: 409,
          res
        });
      }
      // create user
      const user = await User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
      });
      delete user.password;
      return responseMessage({
        data: { message: 'done', user, token: createToken(user.id) },
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
      const user = await User.findOne({ where: { email: { [Op.iLike]: `%${email}%` } } });
      // confirm password
      const confirmUser = user ? await bcrypt.compare(password, user.password) : false;
      if (!confirmUser) {
        return responseMessage({
          data: { message: 'email/password do not match' },
          status: 400,
          res
        });
      }
      delete user.dataValues.password;
      const overview = await UserController.calculateInvestmentOverview({
        userData: { id: user.id }
      });
      return responseMessage({
        data: {
          message: 'login successful',
          user,
          overview,
          token: createToken(user.id)
        },
        status: 200,
        res
      });
    } catch (error) {
      next(error);
    }
  }
}
