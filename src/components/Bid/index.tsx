import { useCallback, useEffect, useState } from 'react';
// import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { WalletConnect } from '../../services/walletService';
import { useMst } from '../../store';
import TextInput from '../TextInput';

import styles from './Bid.module.scss';
import { toast } from 'react-toastify';

interface IBidProps {
  className?: string;
  id: number;
  available: number;
  title: string;
  creatorName: string;
  price: number;
  currency: string;
}

const Bid: React.FC<IBidProps> = observer(
  ({ className, available = 1, title, creatorName, id, currency }) => {
    const walletConnector = useWalletConnectorContext();
    const { user } = useMst();
    const [bidValue, setBidValue] = useState<string>('');
    const [quantity, setQuantity] = useState<string>(available.toString());
    const [balance, setBalance] = useState<string>('');
    // const [youPay, setYouPay] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fee, setFee] = useState(0);

    const getUserBalance = useCallback(() => {
      walletConnector.walletService.connectWallet
        .getBalance(user.address)
        .then((data: string | number) => {
          setBalance(WalletConnect.weiToEth(data));
        });
    }, [user.address, walletConnector.walletService]);
    const handlePlaceABid = () => {
      setIsLoading(true);
      storeApi
        .createBid(id, +bidValue, +quantity, currency)
        .then(() => {
          toast.success('Bid Placed')
          // walletConnector.walletService
          //   .sendTransaction(data.initial_tx)
          //   .catch((e: any) => console.error('Bid modal sendTranscation', e));
        })
        .catch(() => toast.error('Error Place a Bid'))
        .finally(() => setIsLoading(false));
    };

    const fetchFee = useCallback(() => {
      storeApi.getFee('BNB').then(({ data }: any) => setFee(data));
    }, []);
    // useEffect(() => {
    //   setYouPay(
    //     new BigNumber(bidValue || 0)
    //       .multipliedBy(fee)
    //       .dividedBy(100)
    //       .plus(bidValue || 0)
    //       .toString(10),
    //   );
    // }, [bidValue, fee]);
    useEffect(() => {
      if (!user.address) return;
      getUserBalance();
    }, [getUserBalance, user.address]);
    useEffect(() => {
      fetchFee();
    }, [fetchFee]);
    return (
      <div className={cn(className, styles.checkout)}>
        <div className={cn('h4', styles.title)}>Place a bid</div>
        <div className={styles.info}>
          You are about to purchase <strong>{title}</strong> from <strong>{creatorName}</strong>
        </div>
        <div className={styles.stage}>Your bid</div>
        <div className={styles.table}>
          <div className={styles.input_row}>
            <TextInput
              name="bid"
              label=""
              type="number"
              className={styles.input}
              placeholder="Enter bid"
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
              positiveOnly
            />
            <div className={styles.col}>{currency.toUpperCase()}</div>
          </div>
          {available > 1 && (
            <div className={styles.input_row}>
              <TextInput
                name="quantity"
                label=""
                type="number"
                className={styles.input}
                placeholder="Enter quantity"
                value={quantity.toString()}
                onChange={(e) => setQuantity(e.target.value)}
                positiveOnly
                integer
              />
              <div className={styles.col}>Quantity</div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.col}>Your balance</div>
            <div className={styles.col}>
              {balance} {currency.toUpperCase()}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>Service fee</div>
            <div className={styles.col}>{fee}%</div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>Total bid amount</div>
            <div className={styles.col}>
              {bidValue ? `${bidValue} ${currency.toUpperCase()}` : ''}
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <button
            type="button"
            disabled={isLoading}
            className={cn('button', styles.button)}
            onClick={handlePlaceABid}
          >
            {isLoading ? 'Pending' : 'Place a bid'}
          </button>
          <button type="button" className={cn('button-stroke', styles.button)}>
            Cancel
          </button>
        </div>
      </div>
    );
  },
);

export default Bid;
