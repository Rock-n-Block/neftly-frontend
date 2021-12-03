import { FC, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Burger, Button, ChooseWallet, Logo, Modal } from 'components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store';
import { TNullable } from 'typings';

import HeaderLinks from './HeaderLinks';
import MobileMenu from './MobileMenu';
import Search from './Search';
import User from './User';
import Wallet from './Wallet';

import styles from './styles.module.scss';
import { useNoScroll, useWindowSize, useScrollDown } from 'hooks';

const mobilePoint = 1280;

const Headers: FC = observer(() => {
  const { user } = useMst();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setConnectOpen] = useState(false);
  const setScroll = useNoScroll();
  const toggleMenu = useCallback(() => {
    setScroll(!isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, setScroll]);

  const handleOpenConnect = useCallback(() => {
    setConnectOpen(true);
  }, []);

  const handleCloseConnect = useCallback(() => {
    setConnectOpen(false);
  }, []);

  const { width } = useWindowSize();

  const headerRef = useRef<TNullable<HTMLDivElement>>(null);
  useScrollDown(headerRef);

  useEffect(() => {
    if (width > mobilePoint) {
      setIsMenuOpen(false);
      setScroll(false);
    }
  }, [width, setScroll]);

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.flex}>
            <Burger className={styles.burger} onClick={toggleMenu} isMenuOpen={isMenuOpen} />
            <Logo className={styles.headerLogo} />
          </div>
          <Search className={styles.searchDesktop} />
          <HeaderLinks className={styles.headerLinks} />
          {user.address ? (
            <div className={styles.profileInfo}>
              <Wallet />
              <User />
            </div>
          ) : (
            <Button onClick={handleOpenConnect} className={styles.headerConnectBtn} color="black">
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
