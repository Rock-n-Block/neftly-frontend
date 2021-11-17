import { FC } from 'react';
import { TradingEthSVG } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';
import { toFixed } from 'utils';

type Props = {
  className?: string;
  amount: number | string;
};

const TradingHistoryPrice: FC<Props> = ({ className, amount }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <div className={styles.tradingIcon}>
      <TradingEthSVG />
    </div>
    <Text style={{ textTransform: 'uppercase' }} size="m">
      {`${amount === null ? "???" : toFixed(amount, 5)} ETH`}
    </Text>
  </div>
);

export default TradingHistoryPrice;
