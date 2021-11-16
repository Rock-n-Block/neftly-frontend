import { ICurrency } from 'typings';
import styles from './Tooltip.module.scss';
import { Text } from 'components';
import { useDifference } from 'hooks';
import { FC, RefObject, useRef, useCallback } from 'react';
//import { ReactComponents as ETHIcon } from 'assets/img/NFTPreview/ETH.svg';

interface IGraphTooltip {
  top: string;
  left: string;
  date: string;
  value: string;
  prevValue: string;
  currency: ICurrency;
  wrapRef: RefObject<HTMLDivElement>
}

type TCalculateTooltipCords = (cursor: number, size?: number, sType?: 'Width' | 'Height') => number

const Tooltip: FC<IGraphTooltip> = ({ top, left, date, value, prevValue, currency, wrapRef }) => {
  const { difference, isDifferencePositive } = useDifference({ value, prevValue });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculateTooltipCords: TCalculateTooltipCords = useCallback((cursor, size = 1, sType = 'Width') => {
    const offset = 20;
    const winSize: number = wrapRef.current ? wrapRef.current[`offset${sType}`] : 1;
    //need to rework
    if (sType === 'Width') {
      return (cursor + (size + offset * 2) / 2 * ((cursor + size + offset) < winSize ? 1 : -1));
    }
    return (cursor - size / 2);
  }, [wrapRef])

  return (
    <div
      style={{
        top: `${calculateTooltipCords(+top, tooltipRef.current?.offsetHeight, 'Height')}px`,
        left: `${calculateTooltipCords(+left, tooltipRef.current?.offsetWidth)}px`,
      }}
      className={styles.tooltip}
      ref={tooltipRef}
    >
      <img src={currency?.image} alt={currency?.symbol} width={20} height={20} />
      <div className={styles.tooltipRight}>
        <Text className={styles.tooltipHeader} size="xl">
          {value}
          <Text tag="span" color={isDifferencePositive ? 'secondary' : 'red'} weight="medium">
            {isDifferencePositive ? `+${difference}` : difference}%
          </Text>
        </Text>
        <Text size="m">
          {date}
        </Text>
      </div>
    </div>
  );
};

export default Tooltip;
