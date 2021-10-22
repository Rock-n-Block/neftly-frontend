/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { facebookLogo, instagramLogo, twitterLogo } from 'assets/img';
import cx from 'classnames';
import { H4, Text } from 'components';
import { sliceString } from 'utils';

import styles from './styles.module.scss';

type Props = {
  id: number | string;
  className?: string;
  avatar: string;
  name: string;
  publicKey: string;
  description: string;
  instagramLink: string;
  facebookLink: string;
  twitterLink: string;
};

const ArtistDetail: FC<Props> = ({
  id,
  className,
  avatar,
  name,
  publicKey,
  description,
  instagramLink,
  facebookLink,
  twitterLink,
}) => (
  <div className={cx(styles.artistDetail, className)}>
    {!!avatar && (
      <Link to={`${routes.profile.link(id)}`}>
        <img src={avatar} className={styles.image} alt="user avatar" />
      </Link>
    )}
    <div className={styles.detailsSection}>
      <H4>{name}</H4>
      <div className={styles.addressAndName}>
        {name && <Text className={styles.gradientText} size="xl">{`@${name}`}</Text>}
        <Text color="lightGray">{sliceString(publicKey)}</Text>
      </div>
      <Text className={styles.artistDescription} color="lightGray">
        {description}
      </Text>
      <div className={styles.artistDetailsControls}>
        <div>
          {instagramLink && (
            <a className={styles.iconLink} href={instagramLink}>
              <img src={instagramLogo} alt="" />
            </a>
          )}
          {facebookLink && (
            <a className={styles.iconLink} href={facebookLink}>
              <img src={facebookLogo} alt="" />
            </a>
          )}
          {twitterLink && (
            <a className={styles.iconLink} href={twitterLink}>
              <img src={twitterLogo} alt="" />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ArtistDetail;
