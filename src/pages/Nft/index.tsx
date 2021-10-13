import React, { FC } from 'react';
import cx from 'classnames';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import {
  ArtCard,
  Button,
  GiantCard,
  H3,
  Select,
  H4,
  Text,
  TradingHistory,
  Control,
  Loader,
} from 'components';
import {
  TradingHistoryBuyer,
  TradingHistoryEvent,
  TradingHistoryPrice,
} from 'components/Table/TradingHistoryCells';
import { Chart } from 'containers';
import { TableCell, INft, OptionType } from 'typings';
import { useMst } from '../../store';
import { userApi, storeApi } from '../../services/api';

import { data as mockData } from './mockdata';

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
  const {
    user,
    modals: { sell, remove },
  } = useMst();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [selectedHistorySort, setSelectedHistorySort] = React.useState<OptionType>(
    historyOptionsFilter[0],
  );
  const [nft, setNft] = React.useState<INft | null>(null);
  const [allPages, setAllPages] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [artWorks, setArtWorks] = React.useState<INft[]>([]);
  const [isLoadingArtWorks, setLoadingArtWorks] = React.useState<boolean>(false);

  console.log('nft data', nft);

  const nftHistory = React.useMemo(() => {
    if (nft) {
      const data = nft.history.map((event) => ({
        event: {
          type: event.method,
          isDeclined: false,
        },
        price: {
          amount: event.price ? +event.price : 0,
          asset: nft.currency.symbol,
        },
        buyer: {
          avatar: event.avatar,
          name: event.name.length > 20 ? `${event.name.slice(0, 15)}...` : event.name,
          date: moment(event.date).fromNow(),
        },
      }));

      if (selectedHistorySort.value === 'latest') return data;
      if (selectedHistorySort.value === 'highestPrice')
        return data.sort((a, b) => b.price.amount - a.price.amount);
      return data.sort((a, b) => a.price.amount - b.price.amount);
    }
    return [];
  }, [nft, selectedHistorySort]);

  const handleLike = React.useCallback(() => {
    if (user.address) {
      userApi.like({ id: nft?.id });
    }
  }, [nft?.id, user.address]);

  const handleChangeSortTable = (value: any) => {
    setSelectedHistorySort(value);
  };

  const getRelatedArtworks = React.useCallback((page: number) => {
    setLoadingArtWorks(true);
    storeApi
      .getSearchResults({
        type: 'items',
        order_by: 'Recently added',
        tags: 'All items',
        max_price: [2000],
        currency: 'bnb',
        page,
      })
      .then(({ data }: any) => {
        setArtWorks((prev: any) => [...prev, ...data.items]);
        setAllPages(Math.ceil(data.total_tokens / 8));
      })
      .catch((err) => {
        console.log('get artworks', err);
      })
      .finally(() => {
        setLoadingArtWorks(false);
      });
  }, []);

  const handleLoadMore = React.useCallback(() => {
    if (currentPage <= allPages) {
      getRelatedArtworks(currentPage);
    }
  }, [currentPage, allPages, getRelatedArtworks]);

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

  React.useEffect(() => {
    if (sell.checkout.isSuccess || sell.placeBid.isSuccess || remove.isSuccess) {
      getItem();
    }
  }, [sell.checkout.isSuccess, sell.placeBid.isSuccess, getItem, remove.isSuccess]);

  React.useEffect(() => getRelatedArtworks(1), [getRelatedArtworks]);

  React.useEffect(() => {
    if (currentPage !== 1) {
      handleLoadMore();
    }
  }, [handleLoadMore, currentPage]);

  return (
    <div className={cx(styles.detailArtwork, className)}>
      <div className={styles.detailArtworkContent}>
        <Control item={breadcrumbs} />
        <GiantCard
          name={nft?.name || ''}
          views={mockData.views}
          likeAction={handleLike}
          growth={mockData.growth}
          nft={nft}
          onUpdateNft={getItem}
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
            tableData={nftHistory}
            onChangeSort={handleChangeSortTable}
            selectedOption={selectedHistorySort}
          />
        </div>
        <div className={styles.relatedArtwork}>
          <H3>Related Artwork</H3>
          <div className={styles.artCardsWrapper}>
            {artWorks.map((art) => {
              const {
                media: image,
                name,
                price,
                available: inStockNumber,
                creator: { name: author },
                creator: { avatar: authorAvatar },
                tags,
                like_count: likesNumber,
                currency: { symbol: asset },
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
          {!artWorks.length && !isLoadingArtWorks ? <H4>No matches</H4> : ''}
          {isLoadingArtWorks ? <Loader className={styles.loader} /> : ''}
          {currentPage < allPages && !isLoadingArtWorks && artWorks.length ? (
            <div className={styles.viewMoreBtnWrapper}>
              <Button
                color="outline"
                className={styles.viewMoreBtn}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                View More
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default DetailArtwork;
