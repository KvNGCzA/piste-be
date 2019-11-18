const filterAndDelete = ({ investments, status }) => {
  const result = investments
    .filter((investment) => {
      delete investment.dataValues.UserInvestment;
      if (investment.status === status) return true;
      return false;
    });
  return result;
};

export default (investments) => {
  const active = filterAndDelete({ investments, status: 'active' });
  const mature = filterAndDelete({ investments, status: 'mature' });
  let result = {};
  if (active.length) result.active = active;
  if (mature.length) result.mature = mature;
  if (!mature.length || !active.length) {
    result = result[mature.length ? 'mature' : 'active'];
  }
  return result;
};
