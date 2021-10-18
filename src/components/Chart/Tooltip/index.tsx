import { ICurrency } from 'typings';
import styles from './Tooltip.module.scss';
import { Text } from 'components';
import { useDifference } from 'hooks';

interface IGraphTooltip {
  top: string;
  left: string;
  date: string;
  value: string;
  prevValue: string;
  currency: ICurrency;
}

const Tooltip = (props: IGraphTooltip) => {
  const { top, left, date, value, prevValue, currency } = props;
  const { difference, isDifferencePositive } = useDifference({ value, prevValue });

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
        <Text className={styles.tooltipHeader} size="xl">
          {value}
          <Text tag="span" color={isDifferencePositive ? 'secondary' : 'red'} weight="medium">
            {isDifferencePositive ? `+${difference}` : difference}%
          </Text>
        </Text>
        <Text color="gray" size="m">
          {date}
        </Text>
      </div>
    </div>
  );
};

export default Tooltip;
