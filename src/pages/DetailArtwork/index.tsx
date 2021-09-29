import { FC } from 'react';
import cx from 'classnames';
import { Chart } from 'containers';

import { GiantCard } from './components';
import { data } from './mockdata';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

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
      <Chart />
    </div>
  </div>
);

export default DetailArtwork;
