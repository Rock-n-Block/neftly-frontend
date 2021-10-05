import { FC } from 'react';
import cx from 'classnames';
import { H2 } from 'components';

import AuthorComponent from 'pages/Home/HotAuction/components/AuthorComponent';
import DescriptionAndTagsComponent from 'pages/Home/HotAuction/components/DescriptionAndTagsComponent';
import PaymentComponent from 'pages/Home/HotAuction/components/PaymentComponent';
import ViewsAndControlsComponent from 'pages/Home/HotAuction/components/ViewsAndControlsComponent';
import { INft } from '../../typings';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  name: string;
  views: number;
  likeAction: () => void;
  dotsAction: () => void;
  growth: number;
  nft: INft | null;
};

const GiantCard: FC<Props> = ({ className, views, likeAction, dotsAction, growth, nft }) => (
  <div className={cx(styles.giantCard, className)}>
    <img src={nft?.media || ''} alt="" />
    <div className={styles.cardInfo}>
      <H2>{nft?.name || ''}</H2>
      <ViewsAndControlsComponent
        className={styles.detailedViewsAndControl}
        likes={nft?.like_count || 0}
        views={views}
        inStock={nft?.available || 0}
        likeAction={likeAction}
        link="google"
        dotsAction={dotsAction}
        isLicked={nft?.is_liked}
      />
      {nft?.is_auc_selling || nft?.is_selling ? <PaymentComponent growth={growth} nft={nft} /> : ''}
      <AuthorComponent author={nft?.creator.name || ''} authorPic={nft?.creator.avatar || ''} />
      <DescriptionAndTagsComponent tags={nft?.tags || []} body={nft?.description || ''} />
    </div>
  </div>
);

export default GiantCard;
