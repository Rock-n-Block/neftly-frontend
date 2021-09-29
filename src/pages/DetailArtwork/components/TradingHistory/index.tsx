import { FC } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const TradingHistory: FC<Props> = ({ className }) => (
  <div className={cx(styles.tradingHistory, className)}>Hello World!</div>
);

export default TradingHistory;
