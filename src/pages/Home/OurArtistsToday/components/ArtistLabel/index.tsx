import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { ArtistType } from 'typings';

import styles from './styles.module.scss';

type Props = ArtistType & {
  className?: string;
  isSelected?: boolean;
  isVerified?: boolean;
};

const ArtistLabel: FC<Props> = ({
  className,
  avatar,
  name,
  artsNumber,
  isSelected,
  amount,
  asset,
  isVerified = false,
}) => (
  <div className={cx(styles.artistLabel, className)}>
    <div className={styles.avatarContainer}>
      <img src={avatar} alt="avatar" />
      {isVerified && <div className={styles.isVerified} />}
      <div>
        <Text size="m" className={cx(styles.name, { [styles.selected]: isSelected })}>
          {name || 'noname'}
        </Text>
        <Text size="m">{`${artsNumber || 0} Arts`}</Text>
      </div>
    </div>
    <Text size="m" color="lightGray">{`${amount} ${asset || 'ETH'}`}</Text>
  </div>
);

export default ArtistLabel;
