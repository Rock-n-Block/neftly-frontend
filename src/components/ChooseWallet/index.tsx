import React from 'react';
import { arrowRight } from 'assets/img';
import cn from 'classnames';
import { Text } from 'components';
import { chains } from 'config';
import { useWalletConnectorContext } from 'services/walletConnect';
import { chainsEnum } from 'typings';

import styles from './ChooseWallet.module.scss';

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
        <Text tag="p" size="l" weight="medium" className={styles.box_title}>
          Available Blockchain
        </Text>
        <div className={styles.wallets}>
          {Object.values(chains).map((blockchain) => (
            <div
              className={cn(styles.item, {
                [styles.item_active]: blockchain.name === activeChain,
              })}
              onClick={() => hancleChangeActiveChain(blockchain.name)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
              key={blockchain.name}
            >
              <div className={styles.item_wrapper}>
                <img src={blockchain.img} alt="" />
                {blockchain.name.replaceAll('-', ' ')}
              </div>
              <img src={arrowRight} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.box}>
        <Text tag="p" size="l" weight="medium" className={styles.box_title}>
          Available Wallet
        </Text>
        <div className={styles.wallets}>
          {Object.keys(chains[activeChain].provider).map((wallet: any) => {
            return (
              <div
                className={cn(styles.item, styles.item_wallet)}
                onClick={() => connect(activeChain, wallet)}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                key={wallet}
              >
                <div className={styles.item_wrapper}>
                  <img src={chains[activeChain].provider[wallet].img} alt="" />
                  {wallet}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChooseWallet;
