import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { ArtistType } from 'typings';

import styles from './styles.module.scss';

type Props = ArtistType & {
  className?: string;
  isSelected?: boolean;
};

const ArtistLabel: FC<Props> = ({
  className,
  avatar,
  name,
  artsNumber,
  isSelected,
  amount,
  asset,
}) => (
  <div className={cx(styles.artistLabel, className)}>
    <div className={styles.avatarContainer}>
      <img src={avatar} alt="avatar" />
      <div className={styles.isVerified} />
      <div>
        <Text size="m" className={cx(styles.name, { [styles.selected]: isSelected })}>
          {name}
        </Text>
        <Text size="m">{`${artsNumber} Arts`}</Text>
      </div>
    </div>
    <Text size="m" color="lightGray">{`${amount} ${asset}`}</Text>
  </div>
);

export default ArtistLabel;
