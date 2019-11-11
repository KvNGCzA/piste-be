import jwt from 'jsonwebtoken';
import helpers from '../helpers';

const { responseMessage } = helpers;

export default class TokenUtils {
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization || req.query.token;
    if (!token) {
      return responseMessage({
        data: { message: 'please provide a token' },
        status: 401,
        res
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, info) => {
        if (err) return err;
        return info;
      }
    );
    if (!decoded.message) {
      req.userData = decoded;
      return next();
    }
    if (decoded.message === 'jwt expired') {
      return responseMessage({
        data: {
          status: 'unauthorized',
          message: 'token expired'
        },
        status: 401,
        res
      });
    }
    return responseMessage({
      data: {
        status: 'unauthorized',
        message: 'invalid token'
      },
      status: 401,
      res
    });
  }
}
