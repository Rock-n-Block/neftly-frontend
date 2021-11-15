import { FC } from 'react';
import cx from 'classnames';
import { Text, Avatar } from 'components';

import styles from './styles.module.scss';
import { sliceString } from 'utils';
import { IBaseInfo, IOwner, TOptionable } from 'typings';

type Props = {
  className?: string;
  creator: TOptionable<IBaseInfo>;
  owners?: IOwner | IOwner[] | undefined;
};

const AuthorComponent: FC<Props> = ({ className, creator, owners }) => (
  
  <div className={cx(styles.authorBlock, className)}>
    <div className={styles.user}>
      <Avatar
        className={styles.avatar}
        size="36"
        id={creator?.id || ''}
        avatar={creator?.avatar || ''}
        isVerified={creator?.is_verificated}
      />
      <div className={styles.text}>
        <Text size='xs'>Creator</Text>
        <Text size='xl'>{sliceString(creator?.name || '')}</Text>
      </div>
    </div>
    {owners && (
      <div className={styles.owners}>
        {Array.isArray(owners) ? (
          <>
            {owners.map((owner: IOwner) => (
              <div className={styles.user} key={`owner-${owner.id}`}>
                <Avatar
                  className={styles.avatar}
                  size="36"
                  id={creator?.id || ''}
                  avatar={creator?.avatar || ''}
                  isVerified={creator?.is_verificated}
                />
                <div className={styles.text}>
                  <Text size='xs'>Owner</Text>
                  <Text size='xl'>{sliceString(owner.name)}</Text>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.user}>
            <Avatar
              className={styles.avatar}
              size="36"
              id={creator?.id || ''}
              avatar={creator?.avatar || ''}
              isVerified={creator?.is_verificated}
            />
            <div className={styles.text}>
              <Text size='xs'>Owner</Text>
              <Text size='xl'>{sliceString(owners?.name || '')}</Text>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

export default AuthorComponent;
