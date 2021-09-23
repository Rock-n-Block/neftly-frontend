import { FC } from 'react';
import { logo } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => (
  <a
    href="https://google.com"
    rel="noopener noreferrer"
    target="_blank"
    className={cx(styles.logo, className)}
  >
    <img className={styles.logoImage} src={logo} alt="" />
    <Text className={styles.logoText}>Netfly</Text>
  </a>
);

export default Logo;
