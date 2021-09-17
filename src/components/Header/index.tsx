import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import TextInput from '../TextInput/index';

import { useWalletConnectorContext } from '../../services/walletConnect';
import { useMst } from '../../store/store';
import Button from '../Button';
import Image from '../Image';

import Notification from './Notification';
import User from './User';

import styles from './Header.module.scss';

const nav = [
  {
    url: '/search01',
    title: 'Discover',
  },
  {
    url: '/faq',
    title: 'How it work',
  },
  {
    url: '/item',
    title: 'Create item',
  },
  {
    url: '/profile',
    title: 'Profile',
  },
];

const Headers: React.FC = observer(() => {
  const [visibleNav, setVisibleNav] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  // const [search, setSearch] = useState('');
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    user.setIsSearching(true);
    history.push('/');
  };

  // useEffect(() => {
  //   user.setSearch(search);
  // }, [user, search]);

  useEffect(() => {
    if (pathname !== '/') {
      user.setSearch('');
      // setSearch('');
      user.setIsSearching(false);
    }
  }, [user, pathname]);

  // useEffect(() => {
  //   if (isLoading) handleSubmit()
  // }, [handleSubmit, isLoading])

  return (
    <header className={styles.header}>
      <div className={cn('container', styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo.svg"
            // srcDark="/images/logo-light.png"
            alt="Fitness Pro"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={nextId()}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <form className={styles.search} action="" onSubmit={(e: any) => handleSubmit(e)}>
            <TextInput
              type="text"
              placeholder="Search by tags, themes, artists, etc"
              icon="search"
              name="search"
              value={user.search}
              onChange={(e) => user.setSearch(e.target.value)}
            />
            {/* <button type="submit" className={styles.result}>
              <Icon name="search" size="20" />
            </button> */}
          </form>
          {user.address ? (
            <Link className={cn('button-small', styles.button)} to="/upload-variants">
              Upload
            </Link>
          ) : (
            ''
          )}
        </div>
        <Notification className={styles.notification} />
        {user.address ? (
          <Link className={cn('button-small', styles.button)} to="/upload-variants">
            Upload
          </Link>
        ) : (
          ''
        )}
        {!user.address ? (
          <Button
            tabIndex={0}
            className={cn('button-stroke button-small', styles.button)}
            onClick={() => walletConnector.connect()}
            // to="/connect-wallet"
          >
            Connect Wallet
          </Button>
        ) : (
          <User className={styles.user} />
        )}
        <button
          type="button"
          aria-label="Toogle visibility"
          tabIndex={0}
          onKeyDown={() => {}}
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        />
      </div>
    </header>
  );
});

export default Headers;
