import bcrypt from 'bcrypt';
import helpers from '../helpers';
import models from '../database/models';

const { responseMessage } = helpers;
const { User } = models;

export default class AuthController {
  static signup(req, res, next) {
    try {
      return responseMessage({
        data: { message: 'yahoo yahoo' },
        status: 200,
        res
      });
    } catch (error) {
      next(error);
    }
  }
}
