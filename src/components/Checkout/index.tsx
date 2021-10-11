import React from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';
import { toast } from 'react-toastify';

import { useMst } from '../../store';
import { Button, TextInput } from 'components';
import { useUserBalance } from 'hooks';
import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';

import styles from './Checkout.module.scss';

const Checkout: React.FC = observer(() => {
  const {
    modals: { checkout },
    user,
  } = useMst();
  const { walletService } = useWalletConnectorContext();

  const [isLoading, setIsLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState('1');
  const balance = useUserBalance(user.address, checkout.currency);

  const handleChangeAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  }, []);

  const handleBuyToken = React.useCallback(() => {
    if (user.id) {
      setIsLoading(true);
      const amount = quantity ? +quantity : 1;
      storeApi
        .buyToken(
          checkout.tokenId || 0,
          checkout.standart === 'ERC721' ? 0 : +amount,
          checkout.standart === 'ERC721' ? '' : checkout.sellerId,
        )
        .then(({ data }) => {
          walletService
            .sendTransaction(data.initial_tx)
            .then((res: any) => {
              toast.success('success');
              storeApi
                .trackTransaction(res.transactionHash, checkout.tokenId, checkout.sellerId)
                .then(() => {
                  setTimeout(() => {
                    checkout.success();
                  }, 1000);
                });
            })
            .catch((error: any) => {
              toast.error({
                message: 'Error',
                description: 'Something went wrong',
              });
              console.error(error);
            })
            .finally(() => setIsLoading(false));
        })
        .catch((error: any) => {
          toast.error({
            message: 'Error',
            description: 'Something went wrong',
          });
          console.error(error);
        });
    }
  }, [walletService, quantity, user.id, checkout]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.media}>
          <img src={checkout.media} alt="" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{checkout.tokenName}</div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Price</div>
            <div className={styles.itemInfo}>
              <div className={styles.itemPrice}>{`${
                checkout.price
              } ${checkout.currency.toUpperCase()}`}</div>
              <div className={styles.itemPriceUsd}>{`($${checkout.usdPrice})`}</div>
            </div>
          </div>
          {checkout.standart === 'ERC1155' ? (
            <div className={styles.item}>
              <div className={styles.itemTitle}>Quantity</div>
              <TextInput
                label=""
                className={styles.amount}
                value={quantity.toString()}
                onChange={handleChangeAmount}
                type="number"
                name="amount"
                placeholder="1"
                required
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <div className={styles.infoItemName}>Your balance</div>
              <div className={styles.infoItemValue}>{`${new BigNumber(balance).toFixed(
                5,
              )} ${checkout.currency.toUpperCase()}`}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItemName}>Service fee</div>
              <div className={styles.infoItemValue}>{`${
                checkout.feeCurrency
              } ${checkout.currency.toUpperCase()}`}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItemName}>You will pay</div>
              <div className={styles.infoItemValue}>{`${new BigNumber(checkout.price)
                .multipliedBy(
                  +quantity > checkout.tokenAvailable ? checkout.tokenAvailable : quantity || 1,
                )
                .plus(checkout.feeCurrency)} ${checkout.currency.toUpperCase()}`}</div>
            </div>
          </div>
          <Button
            loading={isLoading}
            isFullWidth
            onClick={handleBuyToken}
            disabled={+quantity > +checkout.tokenAvailable}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Checkout;
