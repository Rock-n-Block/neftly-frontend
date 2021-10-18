import { useCallback, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';

interface IProps {
  value: string;
  prevValue: string;
}

const useDifference = ({ value = '0', prevValue = '0' }: IProps) => {
  const [difference, setDifference] = useState('0');

  const calculateDifference = useCallback(() => {
    const absoluteDelta = new BigNumber(value).minus(prevValue);
    const onePercent = new BigNumber(value).dividedBy(100);
    let percentDelta = '100.00';
    if (onePercent.isEqualTo(0)) {
      if (new BigNumber(prevValue).isEqualTo(0)) {
        percentDelta = '0';
      } else {
        percentDelta = new BigNumber(value).isGreaterThan(prevValue) ? '100.00' : '-100.00';
      }
    } else {
      percentDelta = new BigNumber(absoluteDelta).dividedBy(onePercent).toFixed(2);
    }
    setDifference(percentDelta);
  }, [prevValue, value]);

  const isDifferencePositive = useMemo(() => {
    return new BigNumber(difference).isGreaterThan(0);
  }, [difference]);

  useEffect(() => {
    calculateDifference();
  }, [calculateDifference]);

  return { isDifferencePositive, difference };
};

export default useDifference;
