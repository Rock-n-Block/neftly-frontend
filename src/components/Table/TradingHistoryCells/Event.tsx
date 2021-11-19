import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';
import { Burn, Buy, Listing, Mint, Transfer } from 'assets/img';

type Props = {
  className?: string;
  type: 'Listing' | 'Mint' | 'Buy' | 'Transfer' | 'Burn';
  isDeclined?: boolean;
};

const Icons = {
  Listing,
  Mint,
  Buy,
  Transfer,
  Burn,
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
