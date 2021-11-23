import { FC } from 'react';
import cx from 'classnames';
import { Avatar, Text } from 'components';
import { IBaseInfo, IOwner, TOptionable } from 'typings';
import { sliceString } from 'utils';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  creator: TOptionable<IBaseInfo>;
  owners?: IOwner | IOwner[] | undefined;
};

const AuthorComponent: FC<Props> = ({ className, creator, owners }) => {
  return (
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
          <Text size="xs">Creator</Text>
          <Text size="xl">{sliceString(creator?.name || '')}</Text>
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
                    id={owner?.id || ''}
                    avatar={owner?.avatar || ''}
                    isVerified={owner?.is_verificated}
                  />
                  <div className={styles.text}>
                    <Text size="xs">Owner</Text>
                    <Text size="xl">{sliceString(owner.name)}</Text>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.user}>
              <Avatar
                className={styles.avatar}
                size="36"
                id={owners?.id || ''}
                avatar={owners?.avatar || ''}
                isVerified={owners?.is_verificated}
              />
              <div className={styles.text}>
                <Text size="xs">Owner</Text>
                <Text size="xl">{sliceString(owners?.name || '')}</Text>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorComponent;
