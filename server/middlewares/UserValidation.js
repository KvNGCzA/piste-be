import helpers from '../helpers';

const { formattedError } = helpers;

class UserValidation {
  static validateEmail(req) {
    req.checkBody('email', 'please enter an email')
      .exists().notEmpty();
    if (req.body.email) {
      req.checkBody('email', 'please enter a valid email').isEmail();
    }
  }

  static validatePassword(req) {
    req.checkBody('password', 'please enter a password')
      .exists().notEmpty();
    // if (req.body.password) {
    //   req.checkBody('password', 'password must be more than 7 characters')
    //     .isLength({ min: 8 });
    // }
  }

  static validateName(req) {
    req.checkBody('firstName', 'please enter a first name')
      .exists().notEmpty();
    if (req.body.firstName) {
      req.checkBody('firstName', 'please enter a valid first name')
        .custom((firstName) => {
          if (/^[a-zA-Z ]*$/.test(firstName)) return true;
          return false;
        });
    }
    req.checkBody('lastName', 'please enter a last name')
      .exists().notEmpty();
    if (req.body.lastName) {
      req.checkBody('lastName', 'please enter a valid last name')
        .custom((lastName) => {
          if (/^[a-zA-Z ]*$/.test(lastName)) return true;
          return false;
        });
    }
  }

  static validateUserLogin(req, res, next) {
    UserValidation.validateEmail(req);
    UserValidation.validatePassword(req);
    formattedError(req, res, next);
  }

  static validateAdminCreateUser(req, res, next) {
    UserValidation.validateEmail(req);
    UserValidation.validateName(req);
    formattedError(req, res, next);
  }
}

export default UserValidation;
