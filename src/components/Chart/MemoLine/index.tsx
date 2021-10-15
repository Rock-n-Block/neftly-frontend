import { FC, useCallback, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './MemoLine.module.scss';
import { H5, Text } from 'components';
import { ICurrency } from 'typings';

interface IMemoLine {
  data: any;
  options: any;
  getElementAtEvent: (element: any[]) => void;
  currency: ICurrency;
}

interface IGraphTooltip {
  top: string;
  left: string;
  date: string;
  value: string;
  currency: ICurrency;
}

const GraphTooltip = (props: IGraphTooltip) => {
  const { top, left, date, value, currency } = props;
  return (
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      className={styles.tooltip}
    >
      <img src={currency?.image} alt={currency?.symbol} width={20} height={20} />
      <div className={styles.tooltipRight}>
        {/* +2.36% */}
        <H5>{value}</H5>
        <Text color="gray" size="m">
          {date}
        </Text>
      </div>
    </div>
  );
};

const MemoLine: FC<IMemoLine> = ({ data, options, getElementAtEvent, currency }) => {
  const [tooltipTop, setTooltipTop] = useState('0');
  const [tooltipLeft, setTooltipLeft] = useState('0');
  const [tooltipDate, setTooltipDate] = useState('');
  const [tooltipValue, setTooltipValue] = useState('');

  const [showTooltip, setShowTooltip] = useState(false);

  const externalTooltip = useCallback((tooltipModel: any) => {
    // if chart is not defined, return early
    const { chart, tooltip } = tooltipModel;
    if (!chart) {
      return;
    }

    // hide the tooltip when chartjs determines you've hovered out
    if (tooltip.opacity === 0) {
      setShowTooltip(false);
      return;
    }

    setShowTooltip(true);

    const position = chart.canvas;

    // assuming your tooltip is `position: fixed`
    // set position of tooltip
    const left = position.offsetLeft + tooltip.caretX;
    const top = position.offsetTop + tooltip.caretY;

    // set values for display of data in the tooltip
    const date = tooltip.dataPoints[0].label;
    const value = tooltip.dataPoints[0].formattedValue;
    setTooltipTop(top);
    setTooltipLeft(left);
    setTooltipDate(date);
    setTooltipValue(value);
  }, []);
  const chartOptions = useMemo(() => {
    return {
      ...options,
      plugins: {
        ...options.plugins,
        tooltip: {
          ...options.plugins?.tooltip,
          // mode: 'x',
          // intersect: false,
          external: (tooltip: any) => {
            externalTooltip(tooltip);
          },
        },
      },
    };
  }, [externalTooltip, options]);

  return (
    <div className={styles.chartWrapper}>
      <Line data={data} options={chartOptions} height={500} getElementAtEvent={getElementAtEvent} />
      {showTooltip && (
        <GraphTooltip
          value={tooltipValue}
          top={tooltipTop}
          left={tooltipLeft}
          date={tooltipDate}
          currency={currency}
        />
      )}
    </div>
  );
};
export default MemoLine;
