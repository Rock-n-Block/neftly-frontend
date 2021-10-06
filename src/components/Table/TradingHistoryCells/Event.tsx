import { FC } from 'react';
import { tradingOffer, tradingPurchase } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  type: 'Mint' | 'Buy';
  isDeclined?: boolean;
};

const helperObject = {
  Buy: tradingPurchase,
  Mint: tradingOffer,
};

const TradingHistoryCells: FC<Props> = ({ className, type, isDeclined }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <img src={helperObject[type]} alt="" />
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

export default TradingHistoryCells;
