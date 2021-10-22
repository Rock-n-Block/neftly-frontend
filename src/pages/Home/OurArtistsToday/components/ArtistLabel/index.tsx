import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { ArtistType } from 'typings';

import styles from './styles.module.scss';

type Props = ArtistType & {
  className?: string;
  isSelected?: boolean;
  isVerified?: boolean;
  artOwned?: number;
  activeTab: string;
};

const ArtistLabel: FC<Props> = ({
  className,
  avatar,
  name,
  artOwned,
  isSelected,
  amount,
  isVerified = false,
  activeTab,
}) => {
  return (
    <div className={cx(styles.artistLabel, className)}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt="avatar" />
        {isVerified && <div className={styles.isVerified} />}
        <div>
          <Text size="m" className={cx(styles.name, { [styles.selected]: isSelected })}>
            {name || 'noname'}
          </Text>
          <Text size="m">{`${artOwned} Arts`}</Text>
        </div>
      </div>
      <Text size="m" color="lightGray">{`${activeTab !== 'follows' ? '$' : ''}${amount}`}</Text>
    </div>
  );
};

export default ArtistLabel;
