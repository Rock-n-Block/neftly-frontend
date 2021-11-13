import { FC, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './LineWrapper.module.scss';
import { ICurrency } from 'typings';
import Tooltip from '../Tooltip';
import cn from 'classnames';
import { useChartTooltip } from '../../../hooks';
import { ChartOptions } from 'chart.js';

interface ILineWrapper {
  data: any;
  options: ChartOptions;
  getElementAtEvent: (element: any[]) => void;
  currency: ICurrency;
  className?: string;
}

const LineWrapper: FC<ILineWrapper> = ({
  data,
  options,
  getElementAtEvent,
  currency,
  className,
}) => {
  const {
    tooltipTop,
    tooltipLeft,
    tooltipDate,
    tooltipValue,
    showTooltip,
    optionsWithCustomTooltip,
    prevValue,
  } = useChartTooltip({ options });

  const chartWrapRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(styles.chartWrapper, className)} ref={chartWrapRef}>
      <Line
        data={data}
        options={optionsWithCustomTooltip as any}
        getElementAtEvent={getElementAtEvent}
      />
      {showTooltip && (
        <Tooltip
          value={tooltipValue}
          top={tooltipTop}
          left={tooltipLeft}
          date={tooltipDate}
          currency={currency}
          prevValue={prevValue}
          wrapRef={chartWrapRef}
        />
      )}
    </div>
  );
};
export default LineWrapper;
