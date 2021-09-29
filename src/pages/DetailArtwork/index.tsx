import { FC } from 'react';
import cx from 'classnames';
import { ArtCard, Button, H3, Select, Table, Text } from 'components';
import { Chart } from 'containers';
import { TableCell } from 'typings';

import {
  TradingHistoryBuyer,
  TradingHistoryEvent,
  TradingHistoryPrice,
} from './components/TradingHistoryCells';
import { GiantCard } from './components';
import { artworkData, data, tableData } from './mockdata';

import styles from './styles.module.scss';

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
      <div>breadCrumbs</div>
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
        <div className={styles.tradingHistory}>
          <div className={styles.chartFilter}>
            <Text size="l">Price History</Text>
            <div className={styles.chartSelect}>
              <Text color="lightGray">Filter Period</Text>
              <Select className={styles.chartSelect} options={chartOptionsFilter} />
            </div>
          </div>
          <Text size="l">10 items sold</Text>
          <div className={styles.tableWrapper}>
            <Table columns={columnTest} data={tableData} />
          </div>
        </div>
      </div>
      <div className={styles.relatedArtwork}>
        <H3>Relate Artwork</H3>
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
