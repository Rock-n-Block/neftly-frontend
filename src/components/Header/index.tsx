import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../store';
import { TextInput, Button, Burger, Logo, Modal, ChooseWallet } from 'components';
import HeaderLinks from './HeaderLinks';
import MobileMenu from './MobileMenu';
import User from './User';
import { routes } from 'appConstants';

import styles from './styles.module.scss';

import { bell } from 'assets/img';
import Wallet from './Wallet';

const Headers: React.FC = observer(() => {
  const { pathname } = useLocation();
  const { user } = useMst();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setConnectOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);

  useEffect(() => {
    if (pathname !== '/') {
      user.setSearch('');
      // setSearch('');
      user.setIsSearching(false);
    }
  }, [user, pathname]);

  const handleOpenConnect = React.useCallback(() => {
    setConnectOpen(true);
  }, []);

  const handleCloseConnect = React.useCallback(() => {
    setConnectOpen(false);
  }, []);

  const handleChangeUserSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      user.setSearch(e.target.value);
    },
    [user],
  );

  return (
    <>
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
              onChange={handleChangeUserSearch}
              className={styles.headerSearch}
            />
          </div>
          <HeaderLinks className={styles.headerLinks} />
          {user.address ? (
            <div className={styles.profileInfo}>
              <Button color="transparent">
                <Link
                  to={routes.activity.root}
                >
                  <img src={bell} alt="" />
                </Link>
              </Button>
              <Button color="transparent">
                <Wallet />
              </Button>
              <Button color="transparent" className={styles.profileImageWrapper}>
                <User />
              </Button>
            </div>
          ) : (
            <Button onClick={handleOpenConnect} className={styles.headerConnectBtn} color="outline">
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
      <Modal
        visible={isConnectOpen && !user.address}
        onClose={handleCloseConnect}
        title="Pick a wallet"
      >
        <ChooseWallet />
      </Modal>
    </>
  );
});

export default Headers;
