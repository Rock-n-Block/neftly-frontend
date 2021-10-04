import React, { FC } from 'react';
import cx from 'classnames';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ArtCard, Button, GiantCard, H3, Select, Text, TradingHistory, Control } from 'components';
import {
  TradingHistoryBuyer,
  TradingHistoryEvent,
  TradingHistoryPrice,
} from 'components/Table/TradingHistoryCells';
import { Chart } from 'containers';
import { TableCell, INft, IOwner } from 'typings';
import { storeApi } from '../../services/api';
import { useMst } from '../../store';

import { artworkData, data as mockData, tableDataArtwork } from './mockdata';

import styles from './styles.module.scss';

const breadcrumbs = [
  {
    title: 'Discover',
    url: '/discover',
  },
  {
    title: 'Artwork Details',
  },
];

const chartOptionsFilter = [
  {
    label: 'This Year',
    value: 'thisYear',
  },
  {
    label: 'This month',
    value: 'thisMonth',
  },
  {
    label: 'Today',
    value: 'today',
  },
];

const historyOptionsFilter = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Highest Price',
    value: 'highestPrice',
  },
  {
    label: 'Lowest Price',
    value: 'lowestPrice',
  },
];

type Props = {
  className?: string;
};

const columnTest = [
  {
    Header: 'Event',
    accessor: 'event',
    Cell: ({ row }: TableCell<any>) => {
      const { type, isDeclined } = row.original.event;
      return <TradingHistoryEvent type={type} isDeclined={isDeclined} />;
    },
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ row }: TableCell<any>) => {
      const { amount, asset } = row.original.price;
      return <TradingHistoryPrice amount={amount} asset={asset} />;
    },
  },
  {
    Header: 'Buyer',
    accessor: 'buyer',
    Cell: ({ row }: TableCell<any>) => {
      const { name, avatar, date } = row.original.buyer;
      return <TradingHistoryBuyer name={name} avatar={avatar} date={date} />;
    },
  },
];

const DetailArtwork: FC<Props> = observer(({ className }) => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { user } = useMst();

  const [nft, setNft] = React.useState<INft | null>(null);

  console.log('nft data', nft);

  const isOwner = React.useMemo(() => {
    if (nft && nft.owners) {
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
    if (!nft) return false;
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
  }, [nft]);

  console.log('isWrongChain', isWrongChain);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (nft && !isWrongChain) {
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
    if (nft && !isWrongChain && nft.price && nft.is_selling && nft.available !== 0) {
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
    if (nft && !isWrongChain && nft.is_auc_selling && nft.available !== 0) {
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
    if (nft && !isWrongChain && nft.is_auc_selling && nft.bids.length && isOwner) {
      if (nft.standart === 'ERC721') return true;
      if (nft.standart === 'ERC1155' && nft.owner_auction.find((seller) => seller.id === user.id))
        return true;
    }
    return false;
  }, [nft, isOwner, user.id, isWrongChain]);

  console.log('isUserCanEndAuction', isUserCanEndAuction);

  const isUserCanPutOnSale = React.useMemo(() => {
    if (nft && !isWrongChain && isOwner && !nft.is_selling && !nft.is_auc_selling) {
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

  const getItem = React.useCallback(() => {
    storeApi
      .getToken(id)
      .then(({ data }) => setNft(data))
      .catch((err) => {
        history.push('/');
        console.error(err);
      });
  }, [id, history]);

  React.useEffect(() => getItem(), [getItem]);

  return (
    <div className={cx(styles.detailArtwork, className)}>
      <div className={styles.detailArtworkContent}>
        <Control item={breadcrumbs} />
        <GiantCard
          name={mockData.name}
          likes={mockData.likes}
          views={mockData.views}
          inStock={mockData.inStock}
          link={mockData.link}
          likeAction={() => alert('like')}
          dotsAction={() => alert('dots')}
          price={mockData.price}
          asset={mockData.asset}
          growth={mockData.growth}
          growthUsd={mockData.growthUsd}
          author={mockData.author}
          authorAvatar={mockData.authorAvatar}
          tags={mockData.tags}
          description={mockData.description}
          image={mockData.image}
        />
        <div className={styles.chartAndBidders}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartFilter}>
              <Text size="l">Price History</Text>
              <div className={styles.chartSelect}>
                <Text color="lightGray">Filter Period</Text>
                <Select className={styles.chartSelect} options={chartOptionsFilter} />
              </div>
            </div>
            <Chart />
          </div>
          <TradingHistory
            columns={columnTest}
            filterOptions={historyOptionsFilter}
            tableData={tableDataArtwork}
          />
        </div>
        <div className={styles.relatedArtwork}>
          <H3>Related Artwork</H3>
          <div className={styles.artCardsWrapper}>
            {artworkData.map((art) => {
              const {
                image,
                name,
                price,
                asset,
                inStockNumber,
                author,
                authorAvatar,
                likesNumber,
                tags,
              } = art;
              return (
                <ArtCard
                  imageMain={image}
                  name={name}
                  price={price}
                  asset={asset}
                  inStockNumber={inStockNumber}
                  author={author}
                  authorAvatar={authorAvatar}
                  likesNumber={likesNumber}
                  tags={tags}
                />
              );
            })}
          </div>
          <div className={styles.viewMoreBtnWrapper}>
            <Button color="outline" className={styles.viewMoreBtn}>
              View More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailArtwork;
