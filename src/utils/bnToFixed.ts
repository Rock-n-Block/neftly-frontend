import BigNumber from 'bignumber.js/bignumber';

export const toFixed = (amount: number | string, decimals = 0): string => {
  return new BigNumber(amount).toFixed(decimals);
};
