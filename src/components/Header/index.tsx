import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { bell, wallet } from 'assets/img';
import cx from 'classnames';
import { Burger, Logo } from 'components';
import Button from 'components/Button';
import { observer } from 'mobx-react-lite';

import { useWalletConnectorContext } from '../../services/walletConnect';
import { useMst } from '../../store';
import TextInput from '../TextInput/index';

import HeaderLinks from './HeaderLinks';
import MobileMenu from './MobileMenu';
import User from './User';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';

const Headers: React.FC = observer(() => {
  const { pathname } = useLocation();
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);

  useEffect(() => {
    if (pathname !== '/') {
      user.setSearch('');
      // setSearch('');
      user.setIsSearching(false);
    }
  }, [user, pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.flex}>
          <Burger className={styles.burger} onClick={toggleMenu} isMenuOpen={isMenuOpen} />
          <Logo className={styles.headerLogo} />
          <TextInput
            type="text"
            placeholder="Search by tags, themes, artists, etc"
            icon="search"
            name="search"
            value={user.search}
            onChange={(e) => user.setSearch(e.target.value)}
            className={styles.headerSearch}
          />
        </div>
        <HeaderLinks className={styles.headerLinks} />
        {user.address ? (
          <div className={styles.profileInfo}>
            <Button color="transparent">
              <Link to={routes.activity.root}>
                <img src={bell} alt="" />
              </Link>
            </Button>
            <Button color="transparent">
              <img src={wallet} alt="" />
            </Button>
            <Button color="transparent" className={styles.profileImageWrapper}>
              <User />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => walletConnector.connect('Binance', 'MetaMask')}
            className={styles.headerConnectBtn}
            color="outline"
          >
            Connect Wallet
          </Button>
        )}
        {isMenuOpen && (
          <MobileMenu
            toggleMenu={toggleMenu}
            className={cx(styles.mobileMenu, { [styles.mobileMenuOpen]: isMenuOpen })}
          />
        )}
      </div>
    </header>
  );
});

export default Headers;
