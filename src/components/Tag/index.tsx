import { FC } from 'react';
import { burn, lighting } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  type: 'rare' | 'featured' | 'auction';
  auctionEndTime?: string;
};

const helperObject = {
  rare: burn,
  featured: lighting,
  auction: '',
};

const Tag: FC<Props> = ({ className, type, auctionEndTime = '1:52:09' }) => (
  <div className={cx(styles[type], className)}>
    <img src={helperObject[type]} alt="" />
    <Text className={styles.tagText}>{type !== 'auction' ? type : `${auctionEndTime} left`}</Text>
  </div>
);

export default Tag;
