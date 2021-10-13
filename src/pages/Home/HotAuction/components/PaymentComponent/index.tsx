import React, { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';

import { Button, H4, Text } from 'components';
import { INft } from 'typings';
import { useMst } from '../../../../../store';
import { useWalletConnectorContext } from '../../../../../services/walletConnect';
import { contracts } from '../../../../../config';
import { storeApi } from '../../../../../services/api';

import styles from './styles.module.scss';

import { growth as growthImg } from 'assets/img';

type Props = {
  className?: string;
  growth?: number;
  nft: INft | null;
  onUpdateNft?: () => void;
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
};

const PaymentComponent: FC<Props> = observer(
  ({
    className,
    growth,
    nft,
    onUpdateNft,
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
  }) => {
    const { walletService } = useWalletConnectorContext();
    const { user, modals } = useMst();
    const isGrowPositive = (growth && growth > 0) || false;

    const [isApproved, setApproved] = React.useState<boolean>(false);
    const [isApproving, setApproving] = React.useState<boolean>(false);

    const currentPrice = React.useMemo(() => {
      if (nft) {
        if (nft.is_selling) {
          return nft.price;
        }
        if (nft.is_auc_selling && nft.highest_bid) {
          return new BigNumber(nft.highest_bid.amount).toFixed();
        }
      }
      return 0;
    }, [nft]);

    const nftSellingType = React.useMemo(() => {
      if (nft) {
        if (nft.is_selling) {
          return 'sell';
        }
        if (nft.is_auc_selling) {
          return 'auction';
        }
      }
      return '';
    }, [nft]);

    const handleCheckAllowance = React.useCallback(() => {
      if (nft) {
        if (nft.currency.symbol.toUpperCase() === nft.network.native_symbol.toUpperCase()) {
          setApproved(true);
          return;
        }
        walletService
          .checkTokenAllowance(
            nft.currency.symbol.toUpperCase(),
            18,
            contracts.params.EXCHANGE.testnet.address,
          )
          .then((res: boolean) => {
            setApproved(res);
          })
          .catch((err: any) => {
            setApproved(false);
            console.log(err, 'check');
          });
      }
    }, [walletService, nft]);

    const handleApproveToken = React.useCallback(() => {
      if (nft) {
        setApproving(true);
        walletService
          .approveToken(
            nft.currency.symbol.toUpperCase(),
            18,
            contracts.params.EXCHANGE.testnet.address,
          )
          .then(() => {
            setApproved(true);
          })
          .catch((err: any) => {
            console.log(err, 'err approve');
          })
          .finally(() => setApproving(false));
      }
    }, [walletService, nft]);

    const handleSetNft = React.useCallback(() => {
      modals.sell.setNft({
        tokenId: nft?.id,
        standart: nft?.standart,
        tokenName: nft?.name,
        fee: nft?.service_fee,
        price: nft?.price,
        currency: nft?.currency.symbol,
        tokenAvailable: nft?.available,
        media: nft?.media,
        minimalBid:
          +new BigNumber(nft?.highest_bid?.amount || 0).toFixed() || nft?.minimal_bid || 0,
        usdPrice: nft?.USD_price,
        feeCurrency: nft?.currency_service_fee || 0,
        collection: nft?.collection,
        royalty: nft?.royalty,
      });
    }, [nft, modals.sell]);

    const handleBuyNft = React.useCallback(() => {
      handleSetNft();
      if (nft?.standart === 'ERC721') {
        modals.sell.checkout.open(nft.sellers[0].id);
      } else {
        modals.sell.chooseSeller.open(nft?.sellers);
      }
    }, [nft, modals.sell, handleSetNft]);

    const handlePlaceBid = React.useCallback(() => {
      handleSetNft();
      modals.sell.placeBid.open();
    }, [modals.sell, handleSetNft]);

    const handleEndAuction = React.useCallback(() => {
      if (nft) {
        storeApi.endAuction(nft?.id).then(({ data }: any) =>
          walletService.sendTransaction(data.initial_tx).then(() => {
            if (onUpdateNft) {
              onUpdateNft();
            }
          }),
        );
      }
    }, [nft, walletService, onUpdateNft]);

    const handlePutOnSale = React.useCallback(() => {
      handleSetNft();
      modals.sell.putOnSale.open();
    }, [modals.sell, handleSetNft]);

    React.useEffect(() => {
      if (user.address && nft) {
        handleCheckAllowance();
      }
    }, [user.address, nft, handleCheckAllowance]);

    return (
      <div className={cx(className, { [styles.paymentSell]: nftSellingType === 'sell' })}>
        <div className={styles.priceWrapper}>
          <div>
            {nftSellingType === 'sell' ? <Text color="lightGray">Current Price</Text> : null}
            {nftSellingType === 'auction' && nft?.highest_bid ? (
              <Text color="lightGray">Highest Bid</Text>
            ) : null}
            <div className={styles.priceAndGrowth}>
              {currentPrice ? <H4>{`${currentPrice} ${nft?.currency.symbol}`}</H4> : ''}
              {nftSellingType === 'sell' && <Text size="m">{`($${nft?.USD_price})`}</Text>}
            </div>
            {nftSellingType === 'sell' && (
              <Text size="m" className={styles.growthWrapper}>
                <img
                  className={cx(styles.growth, { [styles.negativeGrowth]: !isGrowPositive })}
                  src={growthImg}
                  alt=""
                />
                {`${isGrowPositive ? '+' : '-'}${growth}%`}
              </Text>
            )}
          </div>
          {/* {type === 'auction' && (
          <div>
            <Text color="lightGray">Auction Ending in</Text>
            <Text size="xl">14.45</Text>
          </div>
        )} */}
        </div>

        {user.address ? (
          <div className={styles.sellBtnsWrapper}>
            {isUserCanEndAuction ? (
              <Button onClick={handleEndAuction} isFullWidth>
                End Auction
              </Button>
            ) : null}
            {isUserCanBuyNft && isApproved ? (
              <Button onClick={handleBuyNft} isFullWidth>
                Purchase Now
              </Button>
            ) : null}
            {isUserCanEnterInAuction && isApproved ? (
              <Button onClick={handlePlaceBid} isFullWidth>
                Place a Bid
              </Button>
            ) : null}
            {isUserCanPutOnSale ? (
              <Button onClick={handlePutOnSale} isFullWidth>
                Put on Sale
              </Button>
            ) : null}
            {!isApproved && !isOwner ? (
              <Button isFullWidth loading={isApproving} onClick={handleApproveToken}>
                Approve Token
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

export default PaymentComponent;
