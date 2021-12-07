import React, { useCallback, useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

import { Button, Switch, TextInput, Text } from 'components';
import { storeApi, useWalletConnectorContext } from 'services';
import { useMst } from 'store';
import { chainsEnum } from 'typings';
import { useUserBalance } from 'hooks';
import { exchangeAddrs } from 'config';
import { IconCoin } from 'assets/img';

import styles from './PutSale.module.scss';

interface IPutSaleProps {
  className?: string;
}

const PutSale: React.FC<IPutSaleProps> = ({ className }) => {
  const ExchangeAddress = exchangeAddrs[localStorage.lessnft_nft_chainName as chainsEnum];
  const { walletService } = useWalletConnectorContext();
  const {
    user,
    modals: { sell },
  } = useMst();
  const [price, setPrice] = useState(
    sell.nft.currency.toUpperCase() === 'BNB' ||
      sell.nft.currency.toUpperCase() === 'ETH' ||
      sell.nft.currency.toUpperCase() === 'MATIC' ||
      sell.nft.currency.toUpperCase() === 'TRX',
  );
  const [priceValue, setPriceValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const balance = useUserBalance(user.address, sell.nft.currency);

  const handleCheckApproveNft = useCallback(async () => {
    try {
      const result = await walletService.checkNftTokenAllowance(sell.nft.collection.address);
      return result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [sell.nft.collection.address, walletService]);

  const handleApproveNft = useCallback(async () => {
    try {
      const isAppr = await handleCheckApproveNft();
      if (!isAppr) {
        await walletService.createTransaction(
          'setApprovalForAll',
          [ExchangeAddress, true],
          'NFT',
          false,
          sell.nft.collection.address,
        );
      }
    } catch (err) {
      throw Error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    handleCheckApproveNft,
    sell.nft.collection.address,
    user.address,
    walletService,
    ExchangeAddress,
  ]);

  const fetchStore = useCallback(() => {
    setIsLoading(true);
    handleApproveNft()
      .then(() => {
        storeApi
          .putOnSale(sell.nft.tokenId ? +sell.nft.tokenId : 0, priceValue ? +priceValue : 0, price)
          .then(() => {
            sell.putOnSale.success();
            sell.putOnSale.close();
            toast.success('Token Put on sale');
          })
          .catch((err: any) => {
            toast.error({
              message: 'Error',
              description: 'Something went wrong',
            });
            console.error(err);
          });
      })
      .catch((err: any) => {
        toast.error({
          message: 'Error',
          description: 'Something went wrong',
        });
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [sell.nft, priceValue, price, handleApproveNft, sell.putOnSale]);

  const handleClose = useCallback(() => {
    sell.putOnSale.close();
  }, [sell.putOnSale]);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={styles.line}>
        <div className={styles.icon}>
          <IconCoin />
        </div>
        <div className={styles.details}>
          <Text className={styles.info} color="lightGray" weight="bold" size="xl">
            Instant sale price
          </Text>
          <Text className={styles.text} color="lightGray" weight="medium" size="m">
            Enter the price for which the item will be instantly sold
          </Text>
        </div>
        {sell.nft.currency.toUpperCase() === 'BNB' ||
        sell.nft.currency.toUpperCase() === 'ETH' ||
        sell.nft.currency.toUpperCase() === 'MATIC' ? (
          ''
        ) : (
          <Switch className={styles.switch} value={price} setValue={setPrice} />
        )}
      </div>
      <div className={styles.table}>
        <div className={cn(styles.row, styles.rowInput)}>
          <TextInput
            label=""
            type="number"
            className={cn(styles.input, styles.col)}
            placeholder={price ? 'Enter instant sale price' : 'Enter bid'}
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
            prefix={sell.nft.currency.toUpperCase()}
            prefixClassName={styles.prefix}
            positiveOnly
          />
          {/* <div className={styles.col}>{sell.nft.currency.toUpperCase()}</div> */}
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Your balance</div>
          <div className={styles.col}>
            {balance} {sell.nft.currency.toUpperCase()}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Service fee</div>
          <div className={styles.col}>{sell.nft.fee}%</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>You recieve</div>
          {priceValue ? (
            <div className={styles.col}>
              {new BigNumber(
                (
                  (parseFloat(priceValue) * (100 - sell.nft.fee - sell.nft.royalty)) /
                  100
                ).toString(),
              ).toString(10)}{' '}
              {sell.nft.currency.toUpperCase()}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.btns}>
        <Button
          onClick={fetchStore}
          className={cn('button', styles.button)}
          loading={isLoading}
          color="blue"
          isFullWidth
        >
          Put on sale
        </Button>
        <Button
          type="button"
          className={cn('button-stroke', styles.button)}
          onClick={handleClose}
          isFullWidth
          color="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default observer(PutSale);
