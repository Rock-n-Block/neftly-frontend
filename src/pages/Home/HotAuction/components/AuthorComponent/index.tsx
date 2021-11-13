import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { sliceString } from 'utils';
import { IBaseInfo, IOwner, TOptionable } from 'typings';
import { routes } from '../../../../../appConstants';

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
      <Link to={routes.profile.link(creator?.id || '')} className={styles.avatarWrapper}>
        <img src={creator?.avatar} className={styles.avatar} alt="" />
        {(creator?.is_verificated || true) ? <VerifyIcon /> : null}
      </Link>
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
                <Link to={routes.profile.link(owner.id)} className={styles.avatarWrapper}>
                  <img src={owner.avatar} className={styles.avatar} alt="" />
                  {(owner.is_verificated || true) ? <VerifyIcon /> : null}
                </Link>
                <div className={styles.text}>
                  <Text size='xs'>Owner</Text>
                  <Text size='xl'>{sliceString(owner.name)}</Text>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.user}>
            <Link to={routes.profile.link(owners?.id)} className={styles.avatarWrapper}>
              <img src={owners?.avatar} className={styles.avatar} alt="" />
              {(owners.is_verificated || true) ? <VerifyIcon /> : null}
            </Link>
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
