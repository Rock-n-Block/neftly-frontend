/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { bell, wallet } from 'assets/img';
// import { Link } from 'react-router-dom';
// import cn from 'classnames';
import { Link, Logo } from 'components';
import Button from 'components/Button';
import { observer } from 'mobx-react-lite';

// import { useWalletConnectorContext } from '../../services/walletConnect';
import { useMst } from '../../store/store';
import TextInput from '../TextInput/index';

import User from './User';
import styles from './styles.module.scss';

const nav = [
  {
    url: '/discover',
    title: 'Discover',
  },
  {
    url: '/faq',
    title: 'How it work',
  },
];

const Headers: React.FC = observer(() => {
  const { pathname } = useLocation();
  // const walletConnector = useWalletConnectorContext();
  const { user } = useMst();
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      user.setSearch('');
      // setSearch('');
      user.setIsSearching(false);
    }
  }, [user, pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.flex}>
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
      <div className={styles.headerNavigation}>
        {nav.map(({ url, title }) => {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          return <Link key={url} name={title} link={url} />;
        })}
      </div>
      {isConnected ? (
        <div className={styles.profileInfo}>
          <Button color="transparent">
            <img src={bell} alt="" />
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
          onClick={() => setConnected(!isConnected)}
          className={styles.headerConnectBtn}
          color="outline"
        >
          Connect Wallet
        </Button>
      )}
    </header>
  );
});

export default Headers;
