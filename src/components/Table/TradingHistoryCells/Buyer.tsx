import { FC } from 'react';
import cx from 'classnames';
import { Avatar, EllipsisText, Text } from 'components';

import styles from './styles.module.scss';
import moment from 'moment';

interface IProps {
  className?: string;
  name: string;
  date: string;
  owner: any;
  type?: 'sell' | 'auction';
};

const TradingHistoryBuyer: FC<IProps> = ({ owner, className, name, date, type = 'sell' }) => (
  <div className={cx(styles.tradingHistoryCells, className)}>
    <Avatar className={styles.buyerAvatar} avatar={owner.avatar} id={owner.id} isVerified={owner.is_verificated} />
    <div className={styles.buyerData}>
      <EllipsisText><Text size="m">{name}</Text></EllipsisText>
      {type === 'sell' && <Text size="xs">{moment(date).fromNow()}</Text>}
    </div>
  </div>
);

export default TradingHistoryBuyer;
