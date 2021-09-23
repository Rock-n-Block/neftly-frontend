import { FC } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  size: 'big' | 'med' | 'small';
  color: 'blue' | 'purple' | 'green';
};

const FourPointStar: FC<Props> = ({ className, size, color }) => (
  <div className={cx(styles.fourPointStar, className)}>
    <div className={cx(styles.up, styles.arrow, styles[size], styles[color])} />
    <div className={cx(styles.right, styles.arrow, styles[size], styles[color])} />
    <div className={cx(styles.down, styles.arrow, styles[size], styles[color])} />
    <div className={cx(styles.left, styles.arrow, styles[size], styles[color])} />
  </div>
);

export default FourPointStar;
