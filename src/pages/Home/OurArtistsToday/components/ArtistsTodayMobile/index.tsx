import { FC } from 'react';
import cx from 'classnames';
import { H2, Loader, TabLookingComponent } from 'components';
import { OptionType, TTopUserRes } from 'typings';

import { ArtistLabel } from '..';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  artistData: TTopUserRes;
  isLoading: boolean;
  categories: OptionType[];
  categoriesHandler: (value: OptionType) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArtistsTodayMobile: FC<Props> = ({ className, artistData, isLoading, categories, categoriesHandler }) => {
  return (
    <div className={cx(styles.mobileOurArtist, className)}>
      <H2 align="center">Our Artists</H2>
      <H2 className={styles.gradientTitle}>Today</H2>
      <TabLookingComponent
        tabClassName={styles.tab}
        className={styles.tabs}
        tabs={categories}
        action={categoriesHandler}
      />
      <div className={styles.artistsWrapper}>
        {!isLoading ? (
          artistData.map((artist) => {
            const {
              price,
              user: { is_verificated, avatar, display_name },
            } = artist;
            return (
              <ArtistLabel
                avatar={avatar}
                name={display_name}
                amount={price}
                isVerified={is_verificated}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ArtistsTodayMobile;
