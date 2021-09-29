import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  name: string;
  avatar: string;
  date: string;
};

const TradingHistoryCells: FC<Props> = ({ className, name, avatar, date }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <img src={avatar} alt="" />
    <div>
      <Text size="m">{name}</Text>
      <Text size="m">{date}</Text>
    </div>
  </div>
);

export default TradingHistoryCells;
