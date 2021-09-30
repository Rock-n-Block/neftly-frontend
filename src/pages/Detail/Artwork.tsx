import { FC } from 'react';
import cx from 'classnames';
import { ArtCard, Button, GiantCard, H3, Select, Text, TradingHistory, Control } from 'components';
import {
  TradingHistoryBuyer,
  TradingHistoryEvent,
  TradingHistoryPrice,
} from 'components/Table/TradingHistoryCells';
import { Chart } from 'containers';
import { TableCell } from 'typings';

import { artworkData, data, tableDataArtwork } from './mockdata';

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

const DetailArtwork: FC<Props> = ({ className }) => (
  <div className={cx(styles.detailArtwork, className)}>
    <div className={styles.detailArtworkContent}>
      <Control item={breadcrumbs} />
      <GiantCard
        name={data.name}
        likes={data.likes}
        views={data.views}
        inStock={data.inStock}
        link={data.link}
        likeAction={() => alert('like')}
        dotsAction={() => alert('dots')}
        price={data.price}
        asset={data.asset}
        growth={data.growth}
        growthUsd={data.growthUsd}
        author={data.author}
        authorAvatar={data.authorAvatar}
        tags={data.tags}
        description={data.description}
        image={data.image}
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

export default DetailArtwork;
