import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Switch from '../../../../components/Switch';
import { storeApi } from '../../../../services/api';
import { useWalletConnectorContext } from '../../../../services/walletConnect';
import MetamaskService from '../../../../services/web3';
import { useMst } from '../../../../store/store';

import styles from './PutSale.module.scss';

interface IPutSaleProps {
  className?: string;
  tokenId?: string;
  currency: string;
  updateTokenData: () => void;
  onClose: () => void;
  royalty: number;
}

const PutSale: React.FC<IPutSaleProps> = ({
  className,
  tokenId,
  currency,
  updateTokenData,
  onClose,
  royalty,
}) => {
  const walletConnector = useWalletConnectorContext();
  const [balance, setBalance] = useState<string>('');
  const { user } = useMst();
  const [price, setPrice] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [fee, setFee] = useState(0);
  const getUserBalance = useCallback(() => {
    walletConnector.metamaskService.getEthBalance().then((data: string) => {
      setBalance(MetamaskService.weiToEth(data));
    });
  }, [walletConnector.metamaskService]);
  const fetchStore = useCallback(() => {
    storeApi
      .putOnSale(tokenId ? +tokenId : 0, priceValue ? +priceValue : 0, price)
      .then(() => {
        onClose();
        updateTokenData();
      })
      .catch((err: any) => console.error(err));
  }, [tokenId, priceValue, price, updateTokenData, onClose]);

  const fetchFee = useCallback(() => {
    storeApi.getFee().then(({ data }: any) => setFee(data));
  }, []);

  useEffect(() => {
    fetchFee();
  }, [fetchFee]);
  useEffect(() => {
    if (!user.address) return;
    getUserBalance();
  }, [getUserBalance, user.address]);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={cn('h4', styles.title)}>Put on sale</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>Instant sale price</div>
          <div className={styles.text}>
            Enter the price for which the item will be instanly sold
          </div>
        </div>
        <Switch className={styles.switch} value={price} setValue={setPrice} />
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <input
            className={cn(styles.input, styles.col)}
            placeholder="Enter bid"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <div className={styles.col}>{currency}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Your balance</div>
          <div className={styles.col}>{balance} ETH</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Service fee</div>
          <div className={styles.col}>{fee}%</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>You will recieve</div>
          {priceValue ? (
            <div className={styles.col}>
              {new BigNumber(
                ((parseFloat(priceValue) * (100 - fee - royalty)) / 100).toString(),
              ).toString(10)}{' '}
              {currency}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.btns}>
        <Button onClick={fetchStore} className={cn('button', styles.button)}>
          Continue
        </Button>
        <button type="button" className={cn('button-stroke', styles.button)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PutSale;
