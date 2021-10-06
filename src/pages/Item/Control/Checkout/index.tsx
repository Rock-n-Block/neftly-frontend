import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Icon from '../../../../components/Icon';
import LoaderCircle from '../../../../components/LoaderCircle';
import { storeApi } from '../../../../services/api';
import { useWalletConnectorContext } from '../../../../services/walletConnect';
import { WalletConnect } from '../../../../services/walletService';
import { useMst } from '../../../../store';

import styles from './Checkout.module.scss';

interface ICheckoutProps {
  className?: string;
  tokenId: number;
  standart: string;
  sellerId: string | number;
  fee: number;
  price: number;
  currency: string;
  isVerified: boolean;
  setIsSuccess: (value: boolean) => void;
  close: () => void;
}

const Checkout: React.FC<ICheckoutProps> = ({
  className,
  tokenId,
  standart,
  sellerId,
  price,
  fee,
  currency,
  isVerified,
  setIsSuccess,
  close,
}) => {
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();
  const [balance, setBalance] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('1');

  const getUserBalance = useCallback(() => {
    walletConnector.walletService.connectWallet
      .getBalance(user.address)
      .then((data: string | number) => {
        setBalance(WalletConnect.weiToEth(data));
      });
  }, [walletConnector.walletService]);

  useEffect(() => {
    if (!user.address) return;
    getUserBalance();
  }, [getUserBalance, user.address]);

  const buyToken = useCallback(() => {
    if (user.id) {
      setIsLoading(true);
      storeApi
        .buyToken(
          tokenId || 0,
          standart === 'ERC721' ? 0 : +amount,
          standart === 'ERC721' ? '' : sellerId,
        )
        .then(({ data }) => {
          walletConnector.walletService
            .createTransaction(
              data.initial_tx.method,
              [
                data.initial_tx.data.idOrder,
                data.initial_tx.data.SellerBuyer,
                data.initial_tx.data.tokenToBuy,
                data.initial_tx.data.tokenToSell,
                data.initial_tx.data.fee.feeAddresses,
                [
                  data.initial_tx.data.fee.feeAmounts[0].toString(),
                  data.initial_tx.data.fee.feeAmounts[1].toString(),
                ],
                data.initial_tx.data.signature,
              ],
              'BEP20',
              {
                gas: data.initial_tx.gas,
                gasPrice: data.initial_tx.gasPrice,
                nonce: data.initial_tx.nonce,
                to: data.initial_tx.to,
                value: data.initial_tx.value,
              },
            )
            .then((res: any) => {
              setIsSuccess(true);
              storeApi.trackTransaction(res.transactionHash, tokenId, sellerId).then(() => {
                close();
              });
            })
            .catch((error: any) => console.error(error))
            .finally(() => setIsLoading(false));
        })
        .catch((error: any) => console.error(error));
    }
  }, [
    tokenId,
    standart,
    walletConnector.walletService,
    sellerId,
    setIsSuccess,
    amount,
    user.id,
    close,
  ]);

  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn('h4', styles.title)}>Checkout</div>
      <div className={styles.info}>
        You are about to purchase <strong>C O I N Z</strong> from <strong>UI8</strong>
      </div>
      {!isLoading && (
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>{price}</div>
            <div className={styles.col}>{currency}</div>
          </div>
          {standart === 'ERC1155' && (
            <div className={styles.field}>
              <input
                className={styles.input}
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                type="number"
                name="amount"
                placeholder="Paste amount of purchased tokens"
                required
              />
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.col}>Your balance</div>
            <div className={styles.col}>
              {balance} {currency}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>Service fee</div>
            <div className={styles.col}>{fee}%</div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>You will pay</div>
            <div className={styles.col}>
              {standart === 'ERC1155' ? (price * +amount).toFixed(3) : price} {currency}
            </div>
          </div>
        </div>
      )}
      {!isLoading && !isVerified && (
        <div className={styles.attention}>
          <div className={styles.preview}>
            <Icon name="info-circle" size="32" />
          </div>
          <div className={styles.details}>
            <div className={styles.subtitle}>This creator is not verified</div>
            <div className={styles.text}>Purchase this item at your own risk</div>
          </div>
        </div>
      )}
      {/* <div className={cn('h4', styles.title)}>Follow steps</div> */}
      {isLoading && (
        <div className={styles.line}>
          <div className={styles.icon}>
            <LoaderCircle className={styles.loader} />
          </div>
          <div className={styles.details}>
            <div className={styles.subtitle}>Purchasing</div>
            <div className={styles.text}>Sending transaction with your wallet</div>
          </div>
        </div>
      )}
      {!isLoading ? (
        <div className={styles.btns}>
          <button type="button" className={cn('button', styles.button)} onClick={buyToken}>
            I understand, continue
          </button>
          <button type="button" className={cn('button-stroke', styles.button)}>
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};

Checkout.defaultProps = {
  className: '',
};

export default Checkout;
