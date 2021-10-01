import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import cx from 'classnames';
import {
  ArtCard,
  Carousel,
  Control,
  GiantCard,
  H3,
  Select,
  Text,
  TradingHistory,
} from 'components';
import {
  TradingHistoryBuyer,
  TradingHistoryExpiration,
  TradingHistoryPrice,
} from 'components/Table/TradingHistoryCells';
import { Chart } from 'containers';
import { useGetSlideToShow } from 'hooks';
import { TableCell } from 'typings';

import { artworkData, data, tableDataAuction } from './mockdata';

import styles from './styles.module.scss';

const breadcrumbs = [
  {
    title: 'Discover',
    url: '/discover',
  },
  {
    title: 'Auction Details',
  },
];

const chartOptionsFilter = [
  {
    label: 'Top Bid',
    value: 'topBid',
  },
  {
    label: 'Latest Bid',
    value: 'latestBid',
  },
  {
    label: 'Lowest Bid',
    value: 'lowestBid',
  },
];

type Props = {
  className?: string;
};

const columnTest = [
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ row }: TableCell<any>) => {
      const { amount, asset } = row.original.price;
      return <TradingHistoryPrice amount={amount} asset={asset} />;
    },
  },
  {
    Header: 'Expiration',
    accessor: 'expiration',
    Cell: ({ row }: TableCell<any>) => {
      const { expirationDate } = row.original.expiration;
      return <TradingHistoryExpiration expirationDate={expirationDate} />;
    },
  },
  {
    Header: 'Buyer',
    accessor: 'buyer',
    Cell: ({ row }: TableCell<any>) => {
      const { name, avatar, date } = row.original.buyer;
      return <TradingHistoryBuyer type="auction" name={name} avatar={avatar} date={date} />;
    },
  },
];

const DetailArtwork: FC<Props> = ({ className }) => {
  const numberOfSlide = useGetSlideToShow();

  return (
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
              <Text size="l">Bid History</Text>
              <div className={styles.chartSelect}>
                <Text color="lightGray">Filter Period</Text>
                <Select className={styles.chartSelect} options={chartOptionsFilter} />
              </div>
            </div>
            <Chart />
          </div>
          <TradingHistory
            columns={columnTest}
            filterOptions={chartOptionsFilter}
            tableData={tableDataAuction}
          />
        </div>
        <div className={styles.relatedArtwork}>
          <H3>More Auction Today</H3>
          <Carousel slidesToShow={numberOfSlide} classNameProp={styles.auctionSlider}>
            {artworkData.map((art, index) => {
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
                <Link to={`${routes.gallery.detailArtwork.link}/${index}`}>
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
                </Link>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default DetailArtwork;
