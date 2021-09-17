import { useState } from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ReactComponent as Check } from '../../assets/img/icons/check-gradient.svg';
// import nextId from 'react-id-generator';
import Checkbox from '../../components/Checkbox';
import Icon from '../../components/Icon';
import { useWalletConnectorContext } from '../../services/walletConnect';

import styles from './ConnectWallet.module.scss';

const Connect: React.FC = () => {
  const [age, setAge] = useState(true);
  const [conditions, setConditions] = useState(false);
  const walletConnector = useWalletConnectorContext();

  const menu = [
    {
      title: 'Coinbase Wallet',
      color: '#9757D7',
    },
    {
      title: 'Coinbase Wallet',
      color: 'linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
    },
    {
      title: 'MyEtherWallet',
      color: 'linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
    },
    {
      title: 'Wallet Connect',
      color: 'linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
      onClick: () => walletConnector.connect(),
    },
  ];
  return (
    <div className={cn('section-pt80', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.head}>
          <Link className={styles.back} to="/">
            <Icon name="arrow-prev" size="24" />
            <div className={cn('h2', styles.stage)}>Connect your wallet</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>
            {menu.map((x, index) => (
              <div
                tabIndex={0}
                className={cn({ [styles.active]: index === 1 }, styles.link)}
                key={nextId()}
                onClick={x.onClick}
                role="button"
                onKeyDown={() => {}}
              >
                <div className={styles.icon} style={{ background: x.color }}>
                  <Icon name="wallet" size="24" />
                  <Check />
                </div>
                <span>{x.title}</span>
                <div className={styles.arrow}>
                  <Icon name="arrow-next" size="14" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                // srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-wallet.png"
                alt="Connect wallet"
              />
            </div>
            <div className={styles.item}>
              <div className={cn('h3', styles.title)}>Scan to connect</div>
              <div className={styles.text}>Powered by UI8.Wallet</div>
              <div className={styles.box}>
                <div className={styles.code}>
                  <img src="/images/content/qr-code-dark.png" alt="Qr-code" />
                </div>
              </div>
              <button type="button" className={cn('button-stroke', styles.button)}>
                Don’t have a wallet app?
              </button>
            </div>
            <div className={styles.item}>
              <div className={cn('h3', styles.title)}>Terms of service</div>
              <div className={styles.text}>
                Please take a few minutes to read and understand{' '}
                <span>Stacks Terms of Service</span>. To continue, you’ll need to accept the terms
                of services by checking the boxes.
              </div>
              <div className={styles.preview}>
                <img
                  srcSet="/images/content/connect-pic@2x.jpg 2x"
                  src="/images/content/connect-pic.jpg"
                  alt="Connect wallet"
                />
              </div>
              <div className={styles.variants}>
                <Checkbox
                  className={styles.checkbox}
                  value={age}
                  onChange={() => setAge(!age)}
                  content="I am at least 13 year old"
                />
                <Checkbox
                  className={styles.checkbox}
                  value={conditions}
                  onChange={() => setConditions(!conditions)}
                  content="I agree Stack terms of service"
                />
              </div>
              <div className={styles.btns}>
                <button type="button" className={cn('button-stroke', styles.button)}>
                  Cancel
                </button>
                <button type="button" className={cn('button', styles.button)}>
                  Get started now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
