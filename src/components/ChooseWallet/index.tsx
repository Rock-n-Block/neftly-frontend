import React from 'react';
import cn from 'classnames';

import { chains } from '../../config';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { chainsEnum } from 'typings';

import styles from './ChooseWallet.module.scss';

import arrowImg from '../../assets/img/arrowRight.svg';

const ChooseWallet: React.FC = () => {
  const { connect } = useWalletConnectorContext();
  const [activeChain, setActiveChain] = React.useState<chainsEnum>(
    chains[chainsEnum.Ethereum].name,
  );

  const hancleChangeActiveChain = React.useCallback((name: chainsEnum) => {
    setActiveChain(name);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.box_title}>Available Blockchain</div>
        {Object.values(chains).map((blockchain) => (
          <div
            className={cn(styles.item, {
              [styles.item_active]: blockchain.name === activeChain,
            })}
            onClick={() => hancleChangeActiveChain(blockchain.name)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <div className={styles.item_wrapper}>
              <img src={blockchain.img} alt="" />
              {blockchain.name.replaceAll('-', ' ')}
            </div>
            <img src={arrowImg} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.box}>
        <div className={styles.box_title}>Available Wallet</div>
        {Object.keys(chains[activeChain].provider).map((wallet: any) => (
          <div
            className={cn(styles.item, styles.item_wallet)}
            onClick={() => connect(activeChain, wallet)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <div className={styles.item_wrapper}>
              <img src={chains[activeChain].provider[wallet].img} alt="" />
              {wallet}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseWallet;
