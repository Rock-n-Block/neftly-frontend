import {FC, useCallback, useEffect} from 'react';
import {wallet} from 'assets/img';
import cn from 'classnames';
import {Button, EllipsisText, H6, Text} from 'components';
import {chains} from 'config';
import {usePopover, useUserBalance} from 'hooks';
import {observer} from 'mobx-react';
import {useMst} from 'store';
import {chainsEnum} from 'typings';
import {toFixed} from 'utils';


import styles from './Wallet.module.scss';
import {Popover} from "containers";

// import Theme from '../../Theme';

interface IUserProps {
  className?: string;
}

let MAIN: string;
let WRAP: 'WBNB' | 'WETH' | 'NFT' | 'BEP20' | 'WMATIC' | 'WTRX';

const WalletBody: FC = observer(() => {
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
  const {user, modals: {swap}} = useMst();
  const {closePopover} = usePopover();

  // const [refresh, setRefresh] = useState(false);

  const imageSrc =
    chains[chains[chainsEnum[localStorage.nftcrowd_nft_chainName as chainsEnum]].name].provider[
      localStorage.nftcrowd_nft_providerName
      ].img;
  const balanceMain = useUserBalance(user.address, MAIN, swap.refresh);
  user.setBalance(balanceMain, 'eth');
  const balanceWrap = useUserBalance(user.address, WRAP, swap.refresh);
  user.setBalance(balanceWrap, 'weth');

  const handleOpenModal = useCallback(async () => {
    // setVisibleModal(true);
    swap.open(MAIN, WRAP, false);
    closePopover();
  }, [closePopover, swap]);

  useEffect(() => {
    console.log(swap.getIsOpen);
  }, [swap.getIsOpen]);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.triangle}/>
        <div className={styles.walletLogo}>
          <img src={imageSrc} alt="Wallet Logo"/>
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
    </>
  )
});

const Wallet: FC<IUserProps> = observer(({className}) => {

  return (
    <Popover className={cn(styles.wallet, className)}>
      <Popover.Button>
        <img src={wallet} alt="Avatar"/>
      </Popover.Button>
      <Popover.Body>
        <WalletBody/>
      </Popover.Body>
    </Popover>
    /* <OutsideClickHandler onOutsideClick={() => handleVisible(false)}>
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
     </OutsideClickHandler>*/
  );
});

export default Wallet;
