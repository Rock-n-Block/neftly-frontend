import React, { FC } from 'react';
import cx from 'classnames';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { ArtCard, Button, GiantCard, H3, Select, Text, TradingHistory, Control } from 'components';
import {
  TradingHistoryBuyer,
  TradingHistoryEvent,
  TradingHistoryPrice,
} from 'components/Table/TradingHistoryCells';
import { Chart } from 'containers';
import { TableCell, INft, OptionType } from 'typings';
import { useMst } from '../../store';
import { userApi, storeApi } from '../../services/api';

import { artworkData, data as mockData } from './mockdata';

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
  const { user } = useMst();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [selectedHistorySort, setSelectedHistorySort] = React.useState<OptionType>(
    historyOptionsFilter[0],
  );
  const [nft, setNft] = React.useState<INft | null>(null);

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
          name={nft?.name || ''}
          views={mockData.views}
          likeAction={handleLike}
          dotsAction={() => alert('dots')}
          growth={mockData.growth}
          nft={nft}
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
