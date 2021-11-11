import { FC, useCallback, useRef, useState } from 'react';
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

const Headers: FC = observer(() => {
  const { user } = useMst();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setConnectOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);

  const handleOpenConnect = useCallback(() => {
    setConnectOpen(true);
  }, []);

  const handleCloseConnect = useCallback(() => {
    setConnectOpen(false);
  }, []);

  const headerRef = useRef<TNullable<HTMLDivElement>>(null);

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (headerRef.current) {
      if (prevScrollpos - currentScrollPos < -50) {
        headerRef.current.style.top = `-${headerRef.current.offsetHeight}px`;
        prevScrollpos = currentScrollPos;
      }
      if (prevScrollpos - currentScrollPos > 50) {
        headerRef.current.style.top = '0';
        prevScrollpos = currentScrollPos;
      }
    }
  };

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
              <Button color="transparent">
                <Wallet />
              </Button>
              <Button color="transparent" className={styles.profileImageWrapper}>
                <User />
              </Button>
            </div>
          ) : (
            <Button onClick={handleOpenConnect} className={styles.headerConnectBtn} color="blue">
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
