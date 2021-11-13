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

const VerifyIcon: FC<any> = () => {
  return(
    <div title='verified' className={styles.verifyBody}>
      <span className={styles.verifyMark}/>
    </div>
  )
}

const AuthorComponent: FC<Props> = ({ className, creator, owners }) => (
  
  <div className={cx(styles.authorBlock, className)}>
    <div className={styles.user}>
<<<<<<< HEAD
      <Link to={routes.profile.link(creator?.id || '')} className={styles.avatarWrapper}>
        <img src={creator?.avatar} className={styles.avatar} alt="" />
        {(creator?.is_verificated || true) ? <VerifyIcon /> : null}
      </Link>
=======
      <Avatar
        className={styles.avatar}
        size="36"
        id={creator?.id || ''}
        avatar={creator?.avatar || ''}
      />
>>>>>>> a3fb3d4b72c1cdec1703dcca6d9ebe6ba5df3298
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
<<<<<<< HEAD
                <Link to={routes.profile.link(owner.id)} className={styles.avatarWrapper}>
                  <img src={owner.avatar} className={styles.avatar} alt="" />
                  {(owner.is_verificated || true) ? <VerifyIcon /> : null}
                </Link>
=======
                <Avatar
                  className={styles.avatar}
                  size="36"
                  id={creator?.id || ''}
                  avatar={creator?.avatar || ''}
                />
>>>>>>> a3fb3d4b72c1cdec1703dcca6d9ebe6ba5df3298
                <div className={styles.text}>
                  <Text size='xs'>Owner</Text>
                  <Text size='xl'>{sliceString(owner.name)}</Text>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.user}>
<<<<<<< HEAD
            <Link to={routes.profile.link(owners?.id)} className={styles.avatarWrapper}>
              <img src={owners?.avatar} className={styles.avatar} alt="" />
              {(owners.is_verificated || true) ? <VerifyIcon /> : null}
            </Link>
=======
            <Avatar
              className={styles.avatar}
              size="36"
              id={creator?.id || ''}
              avatar={creator?.avatar || ''}
            />
>>>>>>> a3fb3d4b72c1cdec1703dcca6d9ebe6ba5df3298
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
