import React from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';
import { toast } from 'react-toastify';

import { useMst } from '../../store';
import { TextInput, Button } from 'components';
import { useUserBalance } from 'hooks';
import { storeApi } from '../../services/api';

import styles from './PlaceBid.module.scss';
import checkoutStyles from '../Checkout/Checkout.module.scss';

const PlaceBid: React.FC = () => {
  const {
    modals: { sell },
    user,
  } = useMst();

  const balance = useUserBalance(user.address, sell.nft.currency);

  const [bid, setBid] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');
  const [isLoading, setLoading] = React.useState(false);

  const handleChangeAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  }, []);

  const handleChangeBid = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(e.target.value);
  }, []);

  const handlePlaceBid = React.useCallback(() => {
    setLoading(true);
    storeApi
      .createBid(sell.nft.tokenId, +bid, +quantity, sell.nft.currency)
      .then(() => {
        sell.placeBid.success();
        sell.placeBid.close();
      })
      .catch(({ response }) => {
        toast.error({
          message: 'Error',
          description:
            response.data && response.data.error ? response.data.error : 'Something went wrong',
        });
        console.error('Bid modal createBid', response);
      })
      .finally(() => setLoading(false));
  }, [bid, quantity, sell.nft, sell.placeBid]);

  const userWillPay = React.useMemo(() => {
    return new BigNumber(bid || 0)
      .multipliedBy(+quantity > sell.nft.tokenAvailable ? sell.nft.tokenAvailable : quantity || 1)
      .plus(sell.nft.feeCurrency);
  }, [bid, quantity, sell.nft.tokenAvailable, sell.nft.feeCurrency]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.subtitle}>{`You must bid at least ${
          sell.nft.minimalBid
        } ${sell.nft.currency.toUpperCase()}`}</div>
        <TextInput
          name="price"
          type="number"
          placeholder="e.g. 0.001"
          value={bid}
          onChange={handleChangeBid}
          required
          prefix={sell.nft.currency.toUpperCase()}
          prefixClassName={styles.prefix}
          className={styles.input}
          positiveOnly
        />
        {sell.nft.standart === 'ERC1155' ? (
          <>
            <div className={styles.subtitle}>Quantity</div>
            <TextInput
              label=""
              className={styles.input}
              value={quantity.toString()}
              onChange={handleChangeAmount}
              type="number"
              name="amount"
              placeholder="e.g. 1"
              required
              positiveOnly
              integer
            />
          </>
        ) : (
          ''
        )}
      </div>
      <div className={checkoutStyles.info}>
        <div className={checkoutStyles.infoItem}>
          <div className={checkoutStyles.infoItemName}>Your balance</div>
          <div className={checkoutStyles.infoItemValue}>{`${new BigNumber(balance).toFixed(
            5,
          )} ${sell.nft.currency.toUpperCase()}`}</div>
        </div>
        <div className={checkoutStyles.infoItem}>
          <div className={checkoutStyles.infoItemName}>Service fee</div>
          <div className={checkoutStyles.infoItemValue}>{`${
            sell.nft.feeCurrency
          } ${sell.nft.currency.toUpperCase()}`}</div>
        </div>
        <div className={checkoutStyles.infoItem}>
          <div className={checkoutStyles.infoItemName}>You will pay</div>
          <div
            className={checkoutStyles.infoItemValue}
          >{`${userWillPay} ${sell.nft.currency.toUpperCase()}`}</div>
        </div>
      </div>
      <Button
        loading={isLoading}
        isFullWidth
        onClick={handlePlaceBid}
        disabled={(sell.nft.minimalBid && +bid <= +sell.nft.minimalBid) || +userWillPay > +balance}
        color="blue"
      >
        Place a Bid
      </Button>
    </div>
  );
};

export default observer(PlaceBid);
