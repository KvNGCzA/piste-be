import responseMessage from './responseMessage';

const message = [];

export default (req, res, next, statusCode) => {
  const newErrors = req.validationErrors();
  const errors = {};
  if (newErrors) {
    newErrors.forEach((x) => {
      errors[`${x.param}`] = [];
    });
    newErrors.forEach((err) => {
      if (
        errors[`${err.param}`]
        && errors[`${err.param}`].indexOf(err.msg) === -1
      ) {
        errors[`${err.param}`].push(err.msg);
      }
    });
  }
  if (newErrors || message.length) {
    return responseMessage({ errors }, statusCode || 422, res);
  }
  if (!newErrors && !message.length) return next();
};
