import { useCallback, useMemo, useState } from 'react';
import { ChartOptions } from 'chart.js';

interface IProps {
  options: ChartOptions;
}

const useChartTooltip = ({ options }: IProps) => {
  const [tooltipTop, setTooltipTop] = useState('0');
  const [tooltipLeft, setTooltipLeft] = useState('0');
  const [tooltipDate, setTooltipDate] = useState('0');
  const [tooltipValue, setTooltipValue] = useState('0');
  const [showTooltip, setShowTooltip] = useState(false);

  const [prevValue, setPrevValue] = useState('0');

  const setTooltip = useCallback((tooltipModel: any) => {
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
    const dataPoints = tooltip.dataPoints[0];

    // prevValue and calc diff
    const { dataIndex } = dataPoints;

    // set values for display of data in the tooltip
    const date = dataPoints.label;
    const value = dataPoints.dataset.data[dataIndex].data;
    setPrevValue(dataPoints.dataset.data[dataIndex - 1]?.data || '0');
    setTooltipTop(top);
    setTooltipLeft(left);
    setTooltipDate(date);
    setTooltipValue(value);
  }, []);

  const optionsWithCustomTooltip = useMemo(() => {
    return {
      ...options,
      plugins: {
        ...options.plugins,
        tooltip: {
          ...options.plugins?.tooltip,
          // mode: 'x',
          // intersect: false,
          external: (tooltip: any) => {
            setTooltip(tooltip);
          },
        },
      },
    };
  }, [options, setTooltip]);

  return {
    tooltipTop,
    tooltipLeft,
    tooltipDate,
    tooltipValue,
    prevValue,
    showTooltip,
    optionsWithCustomTooltip,
  };
};
export default useChartTooltip;
