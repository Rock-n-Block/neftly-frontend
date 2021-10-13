import { useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { chainsEnum } from 'typings';
import { chains } from 'config';
import cn from 'classnames';
import { Button, H5, Modal, Text } from 'components';
import { observer } from 'mobx-react';

import { useMst } from 'store';

import Swap from './Swap';

import styles from './Wallet.module.scss';
import { wallet } from 'assets/img';
import { useUserBalance } from 'hooks';
import { toFixed } from 'utils/BigNumberToFixed';

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
    default:
      MAIN = 'MATIC';
      WRAP = 'WMATIC';
      break;
  }
  const { user } = useMst();
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const balanceMain = useUserBalance(user.address, MAIN);
  const balanceWrap = useUserBalance(user.address, WRAP);

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
    chains[chains[chainsEnum[localStorage.netfly_nft_chainName as chainsEnum]].name].provider[
      localStorage.netfly_nft_providerName
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
                {localStorage.netfly_nft_providerName}
              </Text>
            </div>
            <Text size="s" className={styles.balanceTitle}>
              Your balance
            </Text>
            <div className={styles.balance}>
              <H5>
                {toFixed(balanceMain, 5)} {MAIN}
              </H5>
            </div>
            <div className={styles.balance}>
              <H5>
                {toFixed(balanceWrap, 5)} {WRAP}
              </H5>
            </div>
            <Button className={styles.button} color="outline" onClick={handleOpenModal}>
              Convert
            </Button>
          </div>
        )}
        <Modal visible={visibleModal} onClose={() => handleVisibleModal(false)}>
          <Swap close={() => handleVisibleModal(false)} main={MAIN} wrap={WRAP} />
        </Modal>
      </div>
    </OutsideClickHandler>
  );
});

export default Wallet;
