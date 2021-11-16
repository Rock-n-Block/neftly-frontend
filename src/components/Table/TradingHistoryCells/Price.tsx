import { FC } from 'react';
import { tradingEth } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  amount: number | string;
  asset: string;
};

const TradingHistoryCells: FC<Props> = ({ className, amount, asset }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <img src={tradingEth} alt="" />
    <Text style={{ textTransform: 'uppercase' }} size="m">
      {`${amount} ${asset}`}
    </Text>
  </div>
);

export default TradingHistoryCells;
