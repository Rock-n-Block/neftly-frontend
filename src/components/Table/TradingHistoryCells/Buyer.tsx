import { FC } from 'react';
import cx from 'classnames';
import { EllipsisText, Text } from 'components';

import styles from './styles.module.scss';
import moment from 'moment';

interface IProps{
  className?: string;
  name: string;
  avatar: string;
  date: string;
  type?: 'sell' | 'auction';
};

const TradingHistoryBuyer: FC<IProps> = ({ className, name, avatar, date, type = 'sell' }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <img className={styles.buyerAvatar} src={avatar} alt="" />
    <div className={styles.buyerData}>
      <EllipsisText><Text size="m">{name}</Text></EllipsisText>
      {type === 'sell' && <Text size="xs">{moment(date).fromNow()}</Text>}
    </div>
  </div>
);

export default TradingHistoryBuyer;
