import { useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
// import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { observer } from 'mobx-react';

// import { ratesApi } from '../../../services/api';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from 'components';
import Icon from '../../Icon';
import Loader from '../../Loader';
import Modal from '../../Modal';

import Swap from './Swap';

import styles from './User.module.scss';

// import Theme from '../../Theme';

interface IUserProps {
  className?: string;
}

const User: React.FC<IUserProps> = observer(({ className }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();

  const items: Array<{ title: string; icon: 'user' | 'image' | 'bulb' | 'exit'; url: string }> = [
    {
      title: 'Dashboard',
      icon: 'user',
      url: '',
    },
    {
      title: 'Public profile',
      icon: 'user',
      url: '/profile/1',
    },
    {
      title: 'My collections',
      icon: 'user',
      url: '/profile/1',
    },
    {
      title: 'Account Settings',
      icon: 'user',
      url: '',
    },
    {
      title: 'Logout',
      icon: 'exit',
      url: '',
    },
  ];

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(user.address);
  //   setCopyAddress(true);
  // };

  // const fetchBalance = useCallback(() => {
  //   walletConnector.metamaskService
  //     .getEthBalance()
  //     .then((data: any) =>
  //       user.setBalance(
  //         new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
  //         'eth',
  //       ),
  //     );
  //   walletConnector.metamaskService.getWethBalance().then((data: any) => {
  //     ratesApi.getRates();
  //     user.setBalance(
  //       new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
  //       'weth',
  //     );
  //   });
  // }, [walletConnector.metamaskService, user]);

  // useEffect(() => {
  //   if (user.address) fetchBalance();
  // }, [fetchBalance, user.address]);

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
            <div className={styles.user_header}>
              <div className={styles.user_ava}>
                {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <Loader />}
              </div>
              <div className={styles.user_about}>
                <div className={styles.name}>{user.display_name || 'User'}</div>
                <div className={styles.type}>Proffesional Artist</div>
              </div>
            </div>
            <Button className={styles.upload_btn} icon="upload-file">
              Create item
            </Button>
            <div className={styles.menu}>
              {items.map((x) => {
                if (x.url?.startsWith('http')) {
                  return (
                    <a
                      className={styles.item}
                      href={x.url}
                      rel="noopener noreferrer"
                      key={nextId()}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  );
                }
                return x.url !== '' ? (
                  <Link
                    className={styles.item}
                    to={`${x.url}/${user.custom_url ? user.custom_url : user.id}`}
                    onClick={() => setVisible(!visible)}
                    key={nextId()}
                    replace
                  >
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
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
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    {/* <Theme className={styles.theme} /> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <Swap close={() => setVisibleModal(false)} />
        </Modal>
      </div>
    </OutsideClickHandler>
  );
});

export default User;
