import { FC, useCallback, useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import cn from 'classnames';
import { Button, Icon, Loader } from 'components';
import { observer } from 'mobx-react';

import { useWalletConnectorContext } from 'services';
import { useMst } from 'store';

import styles from './User.module.scss';

interface IUserProps {
  className?: string;
}

const User: FC<IUserProps> = observer(({ className }) => {
  const [visible, setVisible] = useState(false);
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();

  const dropdownOptions: Array<{
    title: string;
    icon: 'user' | 'image' | 'bulb' | 'exit';
    url: string;
  }> = [
    {
      title: 'Dashboard',
      icon: 'user',
      url: '/discover',
    },
    {
      title: 'Public profile',
      icon: 'user',
      url: `/profile/${user.id}`,
    },
    {
      title: 'My collections',
      icon: 'user',
      url: `/profile/${user.id}?tab=collections`,
    },
    {
      title: 'Account Settings',
      icon: 'user',
      url: '/profile/edit',
    },
    {
      title: 'Logout',
      icon: 'exit',
      url: '',
    },
  ];

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div
          className={styles.avatar}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          onClick={() => setVisible(!visible)}
        >
          {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <Loader />}
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.triangle} />
            <Link to={`/profile/${user.id}`} className={styles.userHeader}>
              <div className={styles.userAva}>
                {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <Loader />}
              </div>
              <div className={styles.userAbout}>
                <div className={styles.name}>{user.display_name || 'User'}</div>
                <div className={styles.type}>Proffesional Artist</div>
              </div>
            </Link>
            <Link to={routes.create.root} onClick={handleClose}>
              <Button className={styles.uploadBtn} icon="upload-file">
                Create item
              </Button>
            </Link>
            <div className={styles.menu}>
              {dropdownOptions.map((option) => {
                if (option.url?.startsWith('http')) {
                  return (
                    <a
                      className={styles.item}
                      href={option.url}
                      rel="noopener noreferrer"
                      key={nextId()}
                    >
                      <div className={styles.icon}>
                        <Icon name={option.icon} size="20" />
                      </div>
                      <div className={styles.text}>{option.title}</div>
                    </a>
                  );
                }
                return option.url !== '' ? (
                  <Link
                    className={styles.item}
                    to={`${option.url}`}
                    onClick={() => setVisible(!visible)}
                    key={nextId()}
                    replace
                  >
                    <div className={styles.icon}>
                      <Icon name={option.icon} size="20" />
                    </div>
                    <div className={styles.text}>{option.title}</div>
                  </Link>
                ) : (
                  <div
                    tabIndex={0}
                    className={styles.item}
                    key={nextId()}
                    onClick={() => walletConnector.disconnect()}
                    role="button"
                    onKeyDown={() => {}}
                  >
                    <div className={styles.icon}>
                      <Icon name={option.icon} size="20" />
                    </div>
                    <div className={styles.text}>{option.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
});

export default User;
