import { useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { wallet } from 'assets/img';
import cn from 'classnames';
import { Button, EllipsisText, H6, Modal, Text } from 'components';
import { chains } from 'config';
import { useUserBalance } from 'hooks';
import { observer } from 'mobx-react';
import { useMst } from 'store';
import { chainsEnum } from 'typings';
import { toFixed } from 'utils';

import Swap from './Swap';

import styles from './Wallet.module.scss';

// import Theme from '../../Theme';

interface IUserProps {
  className?: string;
}

let MAIN: string;
let WRAP: 'WBNB' | 'WETH' | 'NFT' | 'BEP20' | 'WMATIC' | 'WTRX';

const Wallet: React.FC<IUserProps> = observer(({ className }) => {
  switch (localStorage.nftcrowd_nft_chainName) {
    case 'Binance-Smart-Chain':
      MAIN = 'BNB';
      WRAP = 'WBNB';
      break;
    case 'Ethereum':
      MAIN = 'ETH';
      WRAP = 'WETH';
      break;
    case 'Tron':
      MAIN = 'TRX';
      WRAP = 'WTRX';
      break;
    default:
      MAIN = 'MATIC';
      WRAP = 'WMATIC';
  }
  const { user } = useMst();
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const balanceMain = useUserBalance(user.address, MAIN, refresh);
  user.setBalance(balanceMain, 'eth');
  const balanceWrap = useUserBalance(user.address, WRAP, refresh);
  user.setBalance(balanceWrap, 'weth');

  const handleOpenModal = useCallback(() => {
    setVisibleModal(true);
    setVisible(false);
  }, []);
  const handleVisible = useCallback(
    (value = null) => {
      if (value || value === false) {
        setVisible(value);
      } else {
        setVisible(!visible);
      }
    },
    [visible],
  );

  const handleVisibleModal = useCallback((value) => {
    setVisibleModal(value);
  }, []);

  const imageSrc =
    chains[chains[chainsEnum[localStorage.nftcrowd_nft_chainName as chainsEnum]].name].provider[
      localStorage.nftcrowd_nft_providerName
    ].img;

  return (
    <OutsideClickHandler onOutsideClick={() => handleVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div tabIndex={0} onKeyDown={() => {}} role="button" onClick={handleVisible}>
          <img src={wallet} alt="Avatar" />
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.triangle} />
            <div className={styles.walletLogo}>
              <img src={imageSrc} alt="Wallet Logo" />
              <Text className={styles.provider} size="m">
                {localStorage.nftcrowd_nft_providerName}
              </Text>
            </div>
            <Text size="s" className={styles.balanceTitle}>
              Your balance
            </Text>
            <div className={styles.balance}>
              <H6 className={styles.title}>
                <EllipsisText>
                  <Text tag="span">{toFixed(balanceMain, 5)} </Text>
                </EllipsisText>
                <Text tag="span">{MAIN}</Text>
              </H6>
            </div>
            <div className={styles.balance}>
              <H6 className={styles.title}>
                <EllipsisText>
                  <Text tag="span">{toFixed(balanceWrap, 5)} </Text>
                </EllipsisText>
                <Text tag="span">{WRAP}</Text>
              </H6>
            </div>
            <Button className={styles.button} color="outline" onClick={handleOpenModal}>
              Convert
            </Button>
          </div>
        )}
        <Modal visible={visibleModal} onClose={() => handleVisibleModal(false)}>
          <Swap
            close={() => handleVisibleModal(false)}
            main={MAIN}
            wrap={WRAP}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Modal>
      </div>
    </OutsideClickHandler>
  );
});

export default Wallet;
