import { FC } from 'react';
import cx from 'classnames';
import { Button, H2, TabLookingComponent } from 'components';

import { artists } from '../../mockData';
import { ArtistLabel } from '..';

import styles from './styles.module.scss';
import { useTabs } from '../../../../../hooks';

type Props = {
  className?: string;
};

const artistsLabels = [...artists, ...artists]
  .map((artist) => {
    const { avatar, name, artsNumber, amount, asset } = artist;
    return (
      <ArtistLabel
        avatar={avatar}
        name={name}
        artsNumber={artsNumber}
        amount={amount}
        asset={asset}
      />
    );
  })
  .slice(0, 6);

const tabs = [
  {
    title: 'Most Selling',
    key: 'selling',
  },
  {
    title: 'Most Earning',
    key: 'earning',
  },
  {
    title: 'Most Followed',
    key: 'followed',
  },
  {
    title: 'Most Favorited',
    key: 'favorited',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArtistsTodayMobile: FC<Props> = ({ className }) => {
  const { activeTab, setActiveTab } = useTabs(tabs);
  return (
    <div className={cx(styles.mobileOurArtist, className)}>
      <H2 align="center">Our Artists</H2>
      <H2 className={styles.gradientTitle}>Today</H2>
      <TabLookingComponent
        tabClassName={styles.tab}
        className={styles.tabs}
        tabs={tabs}
        activeTab={activeTab}
        action={setActiveTab}
      />
      <div className={styles.artistsWrapper}>
        {artistsLabels}

        <Button onClick={() => alert('load more')} isFullWidth color="outline">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default ArtistsTodayMobile;
