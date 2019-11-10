export default ({ data, status, res }) => res.status(status).json({
  status: status < 300 ? 'success' : 'failure', ...data
});
