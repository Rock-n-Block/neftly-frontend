/* eslint-disable react/no-array-index-key */
import {FC, useCallback, useMemo} from 'react';
import nextId from 'react-id-generator';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {routes} from 'appConstants';
import {iconCloudUpload, IconDashboard, IconFolders, IconLogout, IconProfile, IconSettings} from 'assets/img';
import cn from 'classnames';
import {Button, Loader, Text} from 'components';
import {observer} from 'mobx-react';
import {useWalletConnectorContext} from 'services';
import {useMst} from 'store';

import styles from './User.module.scss';
import {Popover} from "containers";
import {usePopover} from "hooks";

interface IUserProps {
  className?: string;
}

const UserBody: FC<{ user: any }> = ({user}) => {

  const dropdownOptions = useMemo(
    () => [
      {
        title: 'Dashboard',
        icon: <IconDashboard/>,
        url: routes.discover.root,
      },
      {
        title: 'Public profile',
        icon: <IconProfile/>,
        url: routes.profile.link(user.id),
      },
      {
        title: 'Owned Artworks',
        icon: <IconFolders/>,
        url: routes.profile.link(user.id, 'owned'),
      },
      {
        title: 'Account Settings',
        icon: <IconSettings/>,
        url: routes.profile.edit,
      },
      {
        title: 'Logout',
        icon: <IconLogout/>,
        url: '',
      },
    ],
    [user.id],
  );

  const history = useHistory();
  const {closePopover} = usePopover();
  const walletConnector = useWalletConnectorContext();
  const handleOpenUser = useCallback(() => {
    history.push(routes.profile.link(user.id));
    closePopover();
  }, [history, user.id, closePopover]);
  return (
    <>

      <div
        onClick={handleOpenUser}
        onKeyDown={() => {
        }}
        tabIndex={0}
        role="button"
        className={styles.userHeader}
      >
        <div className={styles.userAva}>
          {user.avatar ? <img src={user.avatar} alt="Avatar"/> : <Loader/>}
        </div>
        <div className={styles.userAbout}>
          <Text className={styles.name} weight="medium" size="xl">{user.display_name || 'User'}</Text>
          <Text className={styles.type} color="primary">Professional Artist</Text>
        </div>
      </div>
      <Button href={routes.create.root} icon={iconCloudUpload}>
        Create item
      </Button>
      <ul className={styles.menu}>
        {dropdownOptions.map((option, index) => {
          if (option.url?.startsWith('http')) {
            return (
              <a
                className={styles.item}
                href={option.url}
                rel="noopener noreferrer"
                key={index}
              >
                <div className={styles.icon}>{option.icon}</div>
                <div className={styles.text}>{option.title}</div>
              </a>
            );
          }
          return option.url !== '' ? (
            <Link
              className={styles.item}
              to={`${option.url}`}
              onClick={() => closePopover()}
              key={nextId()}
              replace
            >
              <div className={styles.icon}>{option.icon}</div>
              <Text className={styles.text} weight="medium" size="m">{option.title}</Text>
            </Link>
          ) : (
            <div
              tabIndex={0}
              className={styles.item}
              key={nextId()}
              onClick={() => walletConnector.disconnect()}
              role="button"
              onKeyDown={() => {
              }}
            >
              <div className={styles.icon}>{option.icon}</div>
              <Text className={styles.text} weight="medium" size="m">{option.title}</Text>
            </div>
          );
        })}
      </ul>
    </>
  )
}

const User: FC<IUserProps> = observer(({className}) => {
  const {user} = useMst();
  return (
    <Popover className={cn(styles.user, className)}>
      <Popover.Button className={styles.popoverBtn}>
        {user.avatar ? <img src={user.avatar} alt="Avatar"/> :
        <Loader/>}
      </Popover.Button>
      <Popover.Body>
        <UserBody user={user}/>
      </Popover.Body>
    </Popover>
  );
});

export default User;
