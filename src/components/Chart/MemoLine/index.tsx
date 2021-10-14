import { FC, memo } from 'react';
import { Line } from 'react-chartjs-2';

interface IMemoLine {
  data: any;
  options: any;
  getElementAtEvent: (element: any[]) => void;
}

const MemoLine: FC<IMemoLine> = memo(
  ({ data, options, getElementAtEvent }) => {
    return (
      <Line data={data} options={options} height={500} getElementAtEvent={getElementAtEvent} />
    );
  },
  (prev, next) => {
    return prev.data.datasets[0].data[0]?.time === next.data.datasets[0].data[0]?.time;
  },
);
export default MemoLine;
