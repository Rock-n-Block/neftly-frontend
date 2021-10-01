import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import { Logo, TextInput } from 'components';
import { Text } from 'components/Typography';
import { useMst } from 'store/store';

import HeaderLinks from '../HeaderLinks';

import styles from './styles.module.scss';

type Props = {
  // isConnected: boolean;
  // address: string;
  className?: string;
  // toggleModal: () => void;
  toggleMenu: () => void;
  // connectAction: () => void;
  // disconnect: () => void;
};

const MobileMenu: FC<Props> = ({
  // isConnected,
  // address,
  className,
  // toggleModal,
  toggleMenu,
  // connectAction,
  // disconnect,
}) => {
  const { pathname } = useLocation();
  // const walletConnector = useWalletConnectorContext();
  const { user } = useMst();

  useEffect(() => {
    if (pathname !== '/') {
      user.setSearch('');
      // setSearch('');
      user.setIsSearching(false);
    }
  }, [user, pathname]);

  return (
    <div className={cx(styles.container, className)}>
      <Logo className={styles.logo} />
      <div className={styles.connectWrapper}>
        <TextInput
          type="text"
          placeholder="Search by tags, themes, artists, etc"
          icon="search"
          name="search"
          value={user.search}
          onChange={(e) => user.setSearch(e.target.value)}
          className={styles.headerSearch}
        />
        <HeaderLinks toggleMenu={toggleMenu} className={styles.mobileMenuLinks} />
      </div>
      <Text align="center" className={styles.bottomText} size="xs" color="lightGray">
        Copyright © 2021 UI8 LLC. All rights reserved
      </Text>
    </div>
  );
};

export default MobileMenu;
