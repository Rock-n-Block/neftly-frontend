import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ReactComponent as Circles } from '../../../assets/img/icons/circles-gradient.svg';
import { ReactComponent as Trangle } from '../../../assets/img/icons/triangle-white.svg';
import iconWeth from '../../../assets/img/icons/weth.svg';
import { ratesApi } from '../../../services/api';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import Button from '../../Button';
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
  const [copyAddress, setCopyAddress] = useState(false);
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();

  const items: Array<{ title: string; icon: 'user' | 'image' | 'bulb' | 'exit'; url: string }> = [
    {
      title: 'My profile',
      icon: 'user',
      url: '/profile',
    },
    // {
    //   title: 'Dark theme',
    //   icon: 'bulb',
    //   url: '',
    // },
    {
      title: 'Disconnect',
      icon: 'exit',
      url: '',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(user.address);
    setCopyAddress(true);
  };

  const fetchBalance = useCallback(() => {
    walletConnector.metamaskService
      .getEthBalance()
      .then((data: any) =>
        user.setBalance(
          new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
          'eth',
        ),
      );
    walletConnector.metamaskService.getWethBalance().then((data: any) => {
      ratesApi.getRates();
      user.setBalance(
        new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
        'weth',
      );
    });
  }, [walletConnector.metamaskService, user]);

  useEffect(() => {
    if (user.address) fetchBalance();
  }, [fetchBalance, user.address]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={styles.head}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.avatar}>
            {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <Loader />}
          </div>
          <div className={styles.wallet}>
            {(+user.balance.eth).toFixed(3)} <span className={styles.currency}>ETH</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <Trangle className={styles.triangle} />
            <div className={styles.name}>{user.display_name || 'User'}</div>
            <div className={styles.code}>
              <div className={styles.number}>
                {user.address.slice(0, 14)}...{user.address.slice(-4)}
              </div>
              <Button
                className={styles.copy}
                onClick={handleCopy}
                onMouseLeave={() => setCopyAddress(false)}
              >
                <Circles />
                <div className={styles.tooltip}>
                  <span className={styles.tooltiptext}>
                    {copyAddress ? 'Success!' : 'Copy adress'}
                  </span>
                </div>
              </Button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img src="/images/content/eth-circle.png" alt="Etherium" />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{(+user.balance.eth).toFixed(3)} ETH</div>
                </div>
              </div>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img src={iconWeth} alt="Wrapped etherium" />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{(+user.balance.weth).toFixed(3)} WETH</div>
                </div>
              </div>
            </div>
            <div className={styles.swapWrapper}>
              <Button
                className={cn('button-stroke', styles.swap)}
                onClick={() => setVisibleModal(true)}
              >
                Convert
              </Button>
            </div>
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
