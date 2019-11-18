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
  return { active, mature };
};
