import { FC } from 'react';
import cx from 'classnames';
import { H2 } from 'components';

import AuthorComponent from 'pages/Home/HotAuction/components/AuthorComponent';
import DescriptionAndTagsComponent from 'pages/Home/HotAuction/components/DescriptionAndTagsComponent';
import PaymentComponent from 'pages/Home/HotAuction/components/PaymentComponent';
import ViewsAndControlsComponent from 'pages/Home/HotAuction/components/ViewsAndControlsComponent';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  name: string;
  likes: number;
  views: number;
  inStock: number;
  link: string;
  likeAction: () => void;
  dotsAction: () => void;
  price: number | string;
  asset: string;
  growth: number;
  growthUsd: number;
  author: string;
  authorAvatar: string;
  tags: string[];
  description: string;
  image: string;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  type: 'auction' | 'sell' | '';
};

const GiantCard: FC<Props> = ({
  className,
  name,
  likes,
  views,
  inStock,
  link,
  likeAction,
  dotsAction,
  price,
  asset,
  growth,
  growthUsd,
  author,
  authorAvatar,
  tags,
  description,
  image,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
  type,
}) => (
  <div className={cx(styles.giantCard, className)}>
    <img src={image} alt="" />
    <div className={styles.cardInfo}>
      <H2>{name}</H2>
      <ViewsAndControlsComponent
        className={styles.detailedViewsAndControl}
        likes={likes}
        views={views}
        inStock={inStock}
        link={link}
        likeAction={likeAction}
        dotsAction={dotsAction}
      />
      {type ? (
        <PaymentComponent
          price={price.toString(10)}
          asset={asset}
          type={type}
          growthUsd={growthUsd}
          growth={growth}
          isUserCanBuyNft={isUserCanBuyNft}
          isUserCanEnterInAuction={isUserCanEnterInAuction}
          isUserCanPutOnSale={isUserCanPutOnSale}
        />
      ) : (
        ''
      )}
      <AuthorComponent author={author} authorPic={authorAvatar} />
      <DescriptionAndTagsComponent tags={tags} body={description} />
    </div>
  </div>
);

export default GiantCard;
