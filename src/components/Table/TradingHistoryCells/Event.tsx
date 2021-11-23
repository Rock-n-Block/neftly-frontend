import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';
import { Burn, Buy, Listing, Mint, Transfer } from 'assets/img';

export type TEventType = 'Listing' | 'Mint' | 'Buy' | 'Transfer' | 'Burn';

type Props = {
  className?: string;
  type: TEventType;
  isDeclined?: boolean;
};

const Icons = {
  Burn,
  Mint,
  Buy,
  Transfer,
  Listing,
}

const TradingHistoryEvent: FC<Props> = ({ className, type, isDeclined }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <img src={Icons[type]} alt="" />
    <Text style={{ textTransform: 'capitalize' }} size="m">
      {type}
    </Text>
    {isDeclined && (
      <Text className={styles.eventDeclined} size="xs" color="red">
        Declined
      </Text>
    )}
  </div>
);

export default TradingHistoryEvent;
