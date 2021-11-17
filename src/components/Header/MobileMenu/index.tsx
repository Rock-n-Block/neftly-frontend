import { FC } from 'react';
import cx from 'classnames';
import { Logo } from 'components';
import IconLinks from 'components/IconLinks';
import { Text } from 'components/Typography';

import HeaderLinks from '../HeaderLinks';
import Search from '../Search';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  toggleMenu: () => void;
};

const MobileMenu: FC<Props> = ({ className, toggleMenu }) => {
  return (
    <div className={cx(styles.container, className)}>
      <Logo className={styles.logo} />
      <Search className={styles.mobileSearch} isDesktop={false} />
      <div className={styles.connectWrapper}>
        <HeaderLinks toggleMenu={toggleMenu} className={styles.mobileMenuLinks}/>
      </div>
      <IconLinks className={styles.mobileMenuIconLinks} />
      <Text align="center" className={styles.bottomText} size="xs" color="lightGray">
        Copyright © 2021 UI8 LLC. All rights reserved
      </Text>
    </div>
  );
};

export default MobileMenu;
