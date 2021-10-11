import React, { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button, H4, Text } from 'components';
import { INft, IOwner } from 'typings';
import { useMst } from '../../../../../store';
import { useWalletConnectorContext } from '../../../../../services/walletConnect';
import { contracts } from '../../../../../config';

import styles from './styles.module.scss';

import { growth as growthImg } from 'assets/img';

type Props = {
  className?: string;
  bidAction?: () => void;
  growth?: number;
  nft: INft | null;
};

const PaymentComponent: FC<Props> = observer(({ className, bidAction, growth, nft }) => {
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
        return nft.highest_bid.amount;
      }
    }
    return 0;
  }, [nft]);

  const isOwner = React.useMemo(() => {
    if (user.id && nft && nft.owners) {
      if (Array.isArray(nft.owners)) {
        return !!nft.owners.find((owner: IOwner) => {
          return owner.id === user.id;
        });
      }
      return user.id === nft.owners.id;
    }
    return false;
  }, [nft, user.id]);

  const isWrongChain = React.useMemo(() => {
    if (!nft || !user.address) return true;
    if (
      nft?.network.name === 'Binance-Smart-Chain' &&
      localStorage.netfly_nft_chainName === 'Binance-Smart-Chain'
    ) {
      return false;
    }
    if (
      nft?.network.name === 'Kardiachain' &&
      localStorage.netfly_nft_chainName === 'KardiaChain'
    ) {
      return false;
    }
    return true;
  }, [nft, user.address]);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (user.id && nft && !isWrongChain) {
      if (nft.standart === 'ERC721' && nft.is_selling && isOwner) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        (nft.sellers.find((seller) => seller.id === user.id) ||
          nft.owner_auction.find((seller) => seller.id === user.id)) &&
        isOwner
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanRemoveFromSale', isUserCanRemoveFromSale);

  const isUserCanBuyNft = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.price && nft.is_selling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        ((nft.sellers.length === 1 && nft.sellers[0].id !== user.id) || nft.sellers.length > 1)
      ) {
        return true;
      }
    }
    return false;
  }, [nft, user.id, isOwner, isWrongChain]);

  const isUserCanEnterInAuction = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.is_auc_selling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        (nft.owner_auction.length > 1 ||
          (nft.owner_auction.length === 1 && nft.owner_auction[0].id !== user.id))
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  const isUserCanEndAuction = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.is_auc_selling && nft.bids.length && isOwner) {
      if (nft.standart === 'ERC721') {
        return true;
      }
      if (nft.standart === 'ERC1155' && nft.owner_auction.find((seller) => seller.id === user.id)) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanEndAuction', isUserCanEndAuction);

  const isUserCanPutOnSale = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && isOwner && !nft.is_selling && !nft.is_auc_selling) {
      if (nft.standart === 'ERC721') {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        !nft.sellers.find((seller) => seller.id === user.id) &&
        !nft.owner_auction.find((seller) => seller.id === user.id)
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

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

  const handleBuyNft = React.useCallback(() => {
    modals.checkout.open({
      tokenId: nft?.id,
      standart: nft?.standart,
      sellerId: nft?.sellers[0].id,
      tokenName: nft?.name,
      fee: nft?.service_fee,
      price: nft?.price,
      currency: nft?.currency.symbol,
      tokenAvailable: nft?.available,
      media: nft?.media,
      usdPrice: nft?.USD_price,
      feeCurrency: nft?.currency_service_fee,
    });
  }, [nft, modals.checkout]);

  React.useEffect(() => {
    if (user.address && nft) {
      handleCheckAllowance();
    }
  }, [user.address, nft, handleCheckAllowance]);

  return (
    <div className={cx(className, { [styles.paymentSell]: nftSellingType === 'sell' })}>
      <div className={styles.priceWrapper}>
        <div>
          <Text color="lightGray">
            {nftSellingType === 'sell' ? 'Current Price' : 'Highest Bid'}
          </Text>
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
          {isUserCanBuyNft && isApproved ? (
            <Button onClick={handleBuyNft} isFullWidth>
              Purchase Now
            </Button>
          ) : null}
          {isUserCanEnterInAuction && isApproved ? (
            <Button onClick={bidAction} isFullWidth>
              Place a Bid
            </Button>
          ) : null}
          {isUserCanPutOnSale ? (
            <Button onClick={bidAction} isFullWidth>
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
});

export default PaymentComponent;
