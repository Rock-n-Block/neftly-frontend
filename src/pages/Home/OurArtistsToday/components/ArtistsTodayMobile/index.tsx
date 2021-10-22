import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import cx from 'classnames';
import { H2, H3, Loader, TabLookingComponent } from 'components';
import { TTopUserRes } from 'typings';

import { ITab } from '../../../../../components/TabLookingComponent';
import { ArtistLabel } from '..';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  artistData: TTopUserRes;
  isLoading: boolean;
  categories: ITab[];
  categoriesHandler: (value: string) => void;
  activeTab: string
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArtistsTodayMobile: FC<Props> = ({
  className,
  artistData,
  isLoading,
  categories,
  categoriesHandler,
  activeTab
}) => {
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
              user: { is_verificated, avatar, display_name, id, owned_tokens },
            } = artist;
            return (
              <Link to={routes.profile.link(id)} key={id}>
                <ArtistLabel
                  avatar={avatar}
                  name={display_name}
                  amount={price}
                  isVerified={is_verificated}
                  artOwned={owned_tokens}
                  activeTab={activeTab}
                />
              </Link>
            );
          })
        ) : (
          <Loader />
        )}
        {!artistData.length && <H3>No data available</H3>}
      </div>
    </div>
  );
};

export default ArtistsTodayMobile;
