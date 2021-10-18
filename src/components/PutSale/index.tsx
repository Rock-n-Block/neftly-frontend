import React, { useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

import { Button, Icon, Switch, TextInput, Text } from 'components';
import { storeApi, useWalletConnectorContext } from 'services';
import { useMst } from 'store';
import { useUserBalance } from 'hooks';
import { is_production, contracts } from 'config';

import styles from './PutSale.module.scss';

interface IPutSaleProps {
  className?: string;
}

const PutSale: React.FC<IPutSaleProps> = ({ className }) => {
  const { walletService } = useWalletConnectorContext();
  const {
    user,
    modals: { sell },
  } = useMst();
  const [price, setPrice] = useState(
    sell.nft.currency.toUpperCase() === 'BNB' || sell.nft.currency.toUpperCase() === 'ETH',
  );
  const [priceValue, setPriceValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const balance = useUserBalance(user.address, sell.nft.currency);

  const handleCheckApproveNft = React.useCallback(async () => {
    try {
      const result = await walletService.checkNftTokenAllowance(sell.nft.collection.address);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, [sell.nft.collection.address, walletService]);

  const handleApproveNft = React.useCallback(async () => {
    try {
      const isAppr = await handleCheckApproveNft();
      if (!isAppr) {
        await walletService.createTransaction(
          'setApprovalForAll',
          [contracts.params.EXCHANGE[is_production ? 'mainnet' : 'testnet'].address, true],
          'NFT',
          false,
          sell.nft.collection.address,
        );
      }
    } catch (err) {
      throw Error;
    }
  }, [handleCheckApproveNft, sell.nft.collection.address, walletService]);

  const fetchStore = React.useCallback(() => {
    setIsLoading(true);
    handleApproveNft()
      .then(() => {
        storeApi
          .putOnSale(sell.nft.tokenId ? +sell.nft.tokenId : 0, priceValue ? +priceValue : 0, price)
          .then(() => {
            sell.putOnSale.success();
            sell.putOnSale.close();
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

  const handleClose = React.useCallback(() => {
    sell.putOnSale.close();
  }, [sell.putOnSale]);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <Text className={styles.info} color="lightGray" weight="bold" size="xl">
            Instant sale price
          </Text>
          <Text className={styles.text} color="lightGray" weight="medium" size="m">
            Enter the price for which the item will be instantly sold
          </Text>
        </div>
        {sell.nft.currency.toUpperCase() === 'BNB' || sell.nft.currency.toUpperCase() === 'ETH' ? (
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
          />
          <div className={styles.col}>{sell.nft.currency.toUpperCase()}</div>
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
