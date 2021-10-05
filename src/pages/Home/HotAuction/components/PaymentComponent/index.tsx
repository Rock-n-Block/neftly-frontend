import React, { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button, H4, Text } from 'components';
import { INft, IOwner } from '../../../../../typings';
import { useMst } from '../../../../../store';

import styles from './styles.module.scss';

import { growth as growthImg } from 'assets/img';

type Props = {
  className?: string;
  bidAction?: () => void;
  growthUsd?: number;
  growth?: number;
  nft: INft | null;
};

const PaymentComponent: FC<Props> = observer(({ className, bidAction, growthUsd, growth, nft }) => {
  const { user } = useMst();
  const isGrowPositive = growth ? growth > 0 : false;

  const currentPrice = React.useMemo(() => {
    if (nft) {
      if (nft.is_selling) return nft.price;
      if (nft.is_auc_selling && nft.highest_bid) return nft.highest_bid.amount;
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

  console.log('isOwner', isOwner);

  const isWrongChain = React.useMemo(() => {
    if (!nft || !user.address) return true;
    if (
      nft?.network.name === 'Binance-Smart-Chain' &&
      localStorage.netfly_nft_chainName === 'Binance'
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

  console.log('isWrongChain', isWrongChain);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (user.id && nft && !isWrongChain) {
      if (nft.standart === 'ERC721' && nft.is_selling && isOwner) return true;
      if (
        nft.standart === 'ERC1155' &&
        (nft.sellers.find((seller) => seller.id === user.id) ||
          nft.owner_auction.find((seller) => seller.id === user.id)) &&
        isOwner
      )
        return true;
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanRemoveFromSale', isUserCanRemoveFromSale);

  const isUserCanBuyNft = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.price && nft.is_selling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) return true;
      if (
        nft.standart === 'ERC1155' &&
        ((nft.sellers.length === 1 && nft.sellers[0].id !== user.id) || nft.sellers.length > 1)
      )
        return true;
    }
    return false;
  }, [nft, user.id, isOwner, isWrongChain]);

  console.log('isUserCanBuyNft', isUserCanBuyNft);

  const isUserCanEnterInAuction = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.is_auc_selling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) return true;
      if (
        nft.standart === 'ERC1155' &&
        (nft.owner_auction.length > 1 ||
          (nft.owner_auction.length === 1 && nft.owner_auction[0].id !== user.id))
      )
        return true;
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanEnterInAuction', isUserCanEnterInAuction);

  const isUserCanEndAuction = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && nft.is_auc_selling && nft.bids.length && isOwner) {
      if (nft.standart === 'ERC721') return true;
      if (nft.standart === 'ERC1155' && nft.owner_auction.find((seller) => seller.id === user.id))
        return true;
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanEndAuction', isUserCanEndAuction);

  const isUserCanPutOnSale = React.useMemo(() => {
    if (user.id && nft && !isWrongChain && isOwner && !nft.is_selling && !nft.is_auc_selling) {
      if (nft.standart === 'ERC721') return true;
      if (
        nft.standart === 'ERC1155' &&
        !nft.sellers.find((seller) => seller.id === user.id) &&
        !nft.owner_auction.find((seller) => seller.id === user.id)
      )
        return true;
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanPutOnSale', isUserCanPutOnSale);

  const nftSellingType = React.useMemo(() => {
    if (nft) {
      if (nft.is_selling) return 'sell';
      if (nft.is_auc_selling) return 'auction';
    }
    return '';
  }, [nft]);

  return (
    <div className={cx(className, { [styles.paymentSell]: nftSellingType === 'sell' })}>
      <div className={styles.priceWrapper}>
        <div>
          <Text color="lightGray">
            {nftSellingType === 'sell' ? 'Current Price' : 'Highest Bid'}
          </Text>
          <div className={styles.priceAndGrowth}>
            {currentPrice ? <H4>{`${currentPrice} ${nft?.currency.symbol}`}</H4> : ''}
            {nftSellingType === 'sell' && <Text size="m">{`($${growthUsd})`}</Text>}
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
          {isUserCanBuyNft ? (
            <Button onClick={bidAction} isFullWidth>
              Purchase Now
            </Button>
          ) : (
            ''
          )}
          {isUserCanEnterInAuction ? (
            <Button onClick={bidAction} isFullWidth>
              Place a Bid
            </Button>
          ) : (
            ''
          )}
          {isUserCanPutOnSale ? (
            <Button onClick={bidAction} isFullWidth>
              Put on Sale
            </Button>
          ) : (
            ''
          )}
          <Button color="outline" onClick={bidAction} isFullWidth>
            Save
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default PaymentComponent;
