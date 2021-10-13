import { useCallback, useEffect, useState } from 'react';
// import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
// import { Link } from 'react-router-dom';
// import { routes } from 'appConstants';
import BigNumber from 'bignumber.js/bignumber';
import { chainsEnum } from 'typings';
import { chains } from 'config';
import cn from 'classnames';
import { Button, H5, Modal, Text } from 'components';
import { observer } from 'mobx-react';

import { ratesApi, useWalletConnectorContext } from 'services';
import { useMst } from 'store';

import Swap from './Swap';

import styles from './Wallet.module.scss';
import { wallet } from 'assets/img';

// import Theme from '../../Theme';

interface IUserProps {
  className?: string;
}

let MAIN: string;
let WRAP: 'WBNB' | 'WETH' | 'NFT' | 'BEP20' | 'WMATIC';

const Wallet: React.FC<IUserProps> = observer(({ className }) => {
  switch (localStorage.netfly_nft_chainName) {
    case 'Binance-Smart-Chain':
      MAIN = 'BNB';
      WRAP = 'WBNB';
      break;
    case 'Ethereum':
      MAIN = 'ETH';
      WRAP = 'WETH';
      break;
      case 'Polygon':
      MAIN = 'MATIC';
      WRAP = 'WMATIC';
      break;
    default:
      break;
  }
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const fetchBalance = useCallback(() => {
    walletConnector.walletService.connectWallet
      .getBalance(user.address)
      .then((data: any) =>
        user.setBalance(
          new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
          'eth',
        ),
      );
    walletConnector.walletService.getTokenBalance(WRAP).then((data: any) => {
      ratesApi.getRates();
      user.setBalance(
        new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
        'weth',
      );
    });
  }, [walletConnector.walletService, user]);

  const handleOpenModal = useCallback(() => {
    setVisibleModal(true);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (user.address) fetchBalance();
  }, [fetchBalance, user.address]);
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div tabIndex={0} onKeyDown={() => {}} role="button" onClick={() => setVisible(!visible)}>
          <img src={wallet} alt="Avatar" />
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.triangle} />
            <div className={styles.walletLogo}>
              <img
                src={
                  chains[chains[chainsEnum[localStorage.netfly_nft_chainName as chainsEnum]].name]
                    .provider[localStorage.netfly_nft_providerName].img
                }
                alt="Wallet Logo"
              />
              <Text className={styles.provider} size="m">
                {localStorage.netfly_nft_providerName}
              </Text>
            </div>
            <Text size="s" className={styles.balanceTitle}>
              Your balance
            </Text>
            <div className={styles.balance}>
              <H5>
                {new BigNumber(user.balance.eth).toFixed(5)} {MAIN}
              </H5>
            </div>
            <div className={styles.balance}>
              <H5>
                {new BigNumber(user.balance.weth).toFixed(5)} {WRAP}
              </H5>
            </div>
            <Button className={styles.button} color="outline" onClick={handleOpenModal}>
              Convert
            </Button>
          </div>
        )}
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <Swap close={() => setVisibleModal(false)} main={MAIN} wrap={WRAP} />
        </Modal>
      </div>
    </OutsideClickHandler>
  );
});

export default Wallet;
