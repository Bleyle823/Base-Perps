import BigNumber from 'bignumber.js';

export const formatUsdValue = (value: number | string, decimals = 2): string => {
  if (!value) return '$0.00';
  const num = new BigNumber(value);
  return `$${num.toFixed(decimals)}`;
};

export const splitNumberByStep = (value: string | number, step = 3): string => {
  const str = value.toString();
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatPercent = (value: number, decimals = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatUsdValueKMB = (value: number): string => {
  if (!value) return '$0';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1e9) {
    return `${sign}$${(absValue / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    return `${sign}$${(absValue / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    return `${sign}$${(absValue / 1e3).toFixed(2)}K`;
  } else {
    return `${sign}$${absValue.toFixed(2)}`;
  }
};
