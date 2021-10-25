import { FC } from 'react';
import PluginServiceRegistrationOptions, { Line } from 'react-chartjs-2';
import { H2 } from 'components';

const DATA_COUNT = 12;
const labels = [];
for (let i = 0; i < DATA_COUNT; i += 1) {
  labels.push(i.toString());
}
const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
const data = {
  labels,
  datasets: [
    {
      label: 'false',
      data: datapoints,
      borderColor: '#C379F6',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    },
  ],
};

const options = {
  mainAspectRatio: false,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
      suggestedMin: -10,
      suggestedMax: 200,
    },
  },
};

console.log(PluginServiceRegistrationOptions);

type Props = {};

const ChartComponent: FC<Props> = () => {
  return (
    <>
      <div className="header">
        <H2 className="title">Line Chart</H2>
      </div>
      <Line data={data as any} options={options as any} />
    </>
  );
};

export default ChartComponent;
