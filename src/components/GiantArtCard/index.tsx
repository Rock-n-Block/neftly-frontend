import { FC } from 'react';
import cx from 'classnames';
import { H2 } from 'components';
import AuthorComponent from 'pages/Home/HotAuction/components/AuthorComponent';
import DescriptionAndTagsComponent from 'pages/Home/HotAuction/components/DescriptionAndTagsComponent';
import PaymentComponent from 'pages/Home/HotAuction/components/PaymentComponent';
import ViewsAndControlsComponent from 'pages/Home/HotAuction/components/ViewsAndControlsComponent';
import { getTokenAmountDisplay } from 'utils';

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
  price: number;
  asset: string;
  growth: number;
  growthUsd: number;
  author: string;
  authorAvatar: string;
  tags: string[];
  description: string;
  image: string;
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
      <PaymentComponent
        price={+getTokenAmountDisplay(price.toString())}
        asset={asset}
        type="sell"
        growthUsd={growthUsd}
        growth={growth}
      />
      <AuthorComponent author={author} authorPic={authorAvatar} />
      <DescriptionAndTagsComponent tags={tags} body={description} />
    </div>
  </div>
);

export default GiantCard;
