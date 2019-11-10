export default (responseObject, statusCode, res) => res.status(statusCode).json({
  status: statusCode < 300 ? 'success' : 'failure', ...responseObject
});
