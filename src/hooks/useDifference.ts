import { useCallback, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { IChartData } from '../typings';

interface IProps {
  chartData: IChartData;
  selectedPointPrice: string;
}

const useDifference = ({ chartData, selectedPointPrice }: IProps) => {
  const [difference, setDifference] = useState('0');

  const getDelta = useCallback(() => {
    if (chartData.datasets[0].data.length < 2) {
      setDifference('-100');
      return;
    }
    const prevLastElPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 2].data;
    let selectedElPrice = prevLastElPrice;
    if (selectedPointPrice) {
      selectedElPrice = selectedPointPrice;
    }
    const lastElPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 1].data;
    const absoluteDelta = new BigNumber(lastElPrice).minus(selectedElPrice);
    const onePercent = new BigNumber(lastElPrice).dividedBy(100);
    const percentDelta = new BigNumber(absoluteDelta)
      .dividedBy(onePercent)
      .multipliedBy(-1)
      .toFixed(2);
    setDifference(percentDelta);
  }, [chartData.datasets, selectedPointPrice]);

  const isDifferencePositive = useMemo(() => {
    return new BigNumber(difference).isGreaterThan(0);
  }, [difference]);

  useEffect(() => {
    getDelta();
  }, [getDelta]);

  return { isDifferencePositive, difference };
};

export default useDifference;
