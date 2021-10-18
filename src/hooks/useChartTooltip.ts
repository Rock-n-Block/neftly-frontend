import { useCallback, useMemo, useState } from 'react';
import { ChartOptions } from 'chart.js';

interface IProps {
  options: ChartOptions;
}

const useChartTooltip = ({ options }: IProps) => {
  const [tooltipTop, setTooltipTop] = useState('0');
  const [tooltipLeft, setTooltipLeft] = useState('0');
  const [tooltipDate, setTooltipDate] = useState('');
  const [tooltipValue, setTooltipValue] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

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

    // set values for display of data in the tooltip
    const date = tooltip.dataPoints[0].label;
    const value = tooltip.dataPoints[0].formattedValue;
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
    showTooltip,
    optionsWithCustomTooltip,
  };
};
export default useChartTooltip;
