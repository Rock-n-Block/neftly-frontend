import { FC } from 'react';
import { burn, lighting } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  type: 'rare' | 'featured';
};

const helperObject = {
  rare: burn,
  featured: lighting,
};

const Tag: FC<Props> = ({ className, type }) => (
  <div className={cx(styles[type], className)}>
    <img src={helperObject[type]} alt="" />
    <Text className={styles.tagText}>{type}</Text>
  </div>
);

export default Tag;
