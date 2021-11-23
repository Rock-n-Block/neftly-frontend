import React, { FC, useMemo } from 'react';
// import { growth as growthImg } from 'assets/img';
import BigNumber from 'bignumber.js/bignumber';
import cx from 'classnames';
import { Button, H4, Text } from 'components';
import { contracts, is_production } from 'config';
import { observer } from 'mobx-react-lite';
import { storeApi } from 'services/api';
import { useWalletConnectorContext } from 'services/walletConnect';
import { useMst } from 'store';
import { INft, TNullable } from 'typings';

import styles from './styles.module.scss';
import { toast } from 'react-toastify';

type Props = {
  className?: string;
  nft: TNullable<INft>;
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

    const [isApproved, setApproved] = React.useState<boolean>(false);
    const [isApproving, setApproving] = React.useState<boolean>(false);

    const ExchangeAddress =
      contracts.params.EXCHANGE[is_production ? 'mainnet' : 'testnet'].address;

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
          .checkTokenAllowance(nft.currency.symbol.toUpperCase(), 18, ExchangeAddress)
          .then((res: boolean) => {
            setApproved(res);
          })
          .catch((err: any) => {
            setApproved(false);
            console.error(err, 'check');
          });
      }
    }, [nft, walletService, ExchangeAddress]);

    const handleApproveToken = React.useCallback(() => {
      if (nft) {
      setApproving(true);
        walletService
          .approveToken(nft.currency.symbol.toUpperCase(), 18, ExchangeAddress)
          .then(() => {
            setApproved(true);
          })
          .catch((err: any) => {
            console.error(err, 'err approve');
          })
          .finally(() => setApproving(false));
      }
    }, [ExchangeAddress, nft, walletService]);

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
      if (nft?.standart === 'ERC721' && !Array.isArray(nft.owners)) {
        modals.sell.checkout.open(nft.owners.id);
      } else {
        modals.sell.chooseSeller.open(nft?.sellers.filter((seller) => seller.id !== user.id));
      }
    }, [nft, modals.sell, handleSetNft, user.id]);

    const handlePlaceBid = React.useCallback(() => {
      handleSetNft();
      modals.sell.placeBid.open();
    }, [modals.sell, handleSetNft]);

    const handleEndAuction = React.useCallback(() => {
      if (nft) {
        storeApi
          .verificateBet(nft.id)
          .then((response: any) => {
            if (response.data.invalid_bet && Object.keys(response.data.invalid_bet).length) {
              toast.error({
                message: 'Highest bid is not correct',
              });
              if (onUpdateNft) {
                onUpdateNft();
              }
            } else {
              storeApi.endAuction(nft?.id).then(({ data }: any) =>
                walletService.sendTransaction(data.initial_tx).then(() => {
                  if (onUpdateNft) {
                    onUpdateNft();
                  }
                }),
              );
            }
          })
          .catch(() => {
            toast.error({
              message: 'Something went wrong',
            });
          });
      }
    }, [nft, walletService, onUpdateNft]);

    const handlePutOnSale = React.useCallback(() => {
      handleSetNft();
      modals.sell.putOnSale.open();
    }, [modals.sell, handleSetNft]);

    const isUserCanApprove = useMemo(() => {
      if (!isOwner) {
        return true;
      }
      if (nft?.standart === 'ERC1155') {
        if (nft.sellers.length > 1) {
          return true;
        }
        if (nft.sellers.length === 1 && nft.sellers[0].id !== user.id) {
          return true;
        }
      }
      return false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nft?.standart, nft?.sellers, isOwner, user.id]);

    React.useEffect(() => {
      if (user.address && nft) {
        handleCheckAllowance();
      }
    }, [user.address, nft, handleCheckAllowance]);

    return (
      <div className={cx(className, { [styles.paymentSell]: nftSellingType === 'sell' })}>
        <div className={styles.priceWrapper}>
          <div>
            {nftSellingType === 'sell' ? <Text size='m'>Current Price</Text> : null}
            {nftSellingType === 'auction' && nft?.highest_bid ? (
              <Text color="lightGray">Highest Bid</Text>
            ) : null}
            <div className={styles.priceAndGrowth}>
              {currentPrice ? <H4>{`${currentPrice} ${nft?.currency.symbol}`}</H4> : ''}
              {nftSellingType === 'sell' && nft?.USD_price !== undefined && (
                <Text size="m">{nft.USD_price > 0.01 ? `$${nft.USD_price}` : '<$0.01'}</Text>
              )}
            </div>
            {!!nft?.minimal_bid && (
              <Text color="lightGray">{`Minimal bid ${nft.minimal_bid} ${nft?.currency.symbol}`}</Text>
            )}
          </div>
        </div>

        {user.address ? (
          <div className={styles.sellBtnsWrapper}>
            {isUserCanEndAuction ? (
              <Button padding='custom' onClick={handleEndAuction} className={styles.purchaseButton}>
                End Auction
              </Button>
            ) : null}
            {isUserCanBuyNft && isApproved ? (
              <Button padding='custom' onClick={handleBuyNft} className={styles.purchaseButton}>
                Purchase Now
              </Button>
            ) : null}
            {isUserCanEnterInAuction && isApproved ? (
              <Button padding='custom' onClick={handlePlaceBid} className={styles.purchaseButton}>
                Place a Bid
              </Button>
            ) : null}
            {isUserCanPutOnSale ? (
              <Button padding='custom' onClick={handlePutOnSale} className={styles.purchaseButton}>
                Put on Sale
              </Button>
            ) : null}
            {!isApproved && isUserCanApprove && (nft?.is_selling || nft?.is_auc_selling) ? (
              <Button padding='custom' loading={isApproving} onClick={handleApproveToken} className={styles.purchaseButton}>
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
