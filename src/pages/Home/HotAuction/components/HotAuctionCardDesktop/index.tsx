/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react';
import cx from 'classnames';
import { H3 } from 'components';

import AuthorComponent from '../AuthorComponent';
import BiddersComponent from '../BiddersComponent';
import DescriptionAndTagsComponent from '../DescriptionAndTagsComponent';
import PaymentComponent from '../PaymentComponent';
import ViewsAndControlsComponent from '../ViewsAndControlsComponent';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  title: string;
  author: string;
  authorPic: string;
  artPic: string;
  body: string;
  tags: string[];
  views: number;
  likes: number;
  currentPrice: number;
  priceAsset: string;
  auctionEndingTime: any;
  bidders: any[];
};

const HotAuctionCardDesktop: FC<Props> = ({
  className,
  title,
  authorPic,
  author,
  body,
  tags,
  views,
  likes,
  artPic,
  currentPrice,
  priceAsset,
  bidders,
}) => (
  <div className={cx(styles.desktopCard, className)}>
    <div className={styles.descriptionControls}>
      <div className={styles.description}>
        <H3>{title}</H3>
        <AuthorComponent authorPic={authorPic} author={author} />
        <DescriptionAndTagsComponent body={body} tags={tags} />
      </div>
      <ViewsAndControlsComponent
        likes={likes}
        views={views}
        link="https://google.com"
        likeAction={() => alert('likeAction')}
        dotsAction={() => alert('dotsAction')}
      />
    </div>
    <div className={styles.imageWrapper}>
      <img src={artPic} alt="art pic" />
    </div>
    <div className={styles.priceAndBidders}>
      <PaymentComponent
        type="auction"
        bidAction={() => alert('bid')}
        price={currentPrice}
        asset={priceAsset}
      />
      <BiddersComponent bidders={bidders} />
    </div>
  </div>
);

export default HotAuctionCardDesktop;
