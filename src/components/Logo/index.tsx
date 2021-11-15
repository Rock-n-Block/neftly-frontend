import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { logo } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => (
  <Link className={cx(styles.logo, className)} to={routes.home.root}>
    <img className={styles.logoImage} src={logo} alt="" />
    <Text className={styles.logoText} size="xl">Nftcrowd</Text>
  </Link>
);

export default Logo;
