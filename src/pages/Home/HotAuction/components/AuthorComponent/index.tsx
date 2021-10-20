import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { Link } from 'react-router-dom';

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
      <Link to={`/profile/${creator?.id}`} className={styles.avatarWrapper}>
        <img src={creator?.avatar} className={styles.avatar} alt="" />
      </Link>
      <div className={styles.text}>
        <Text color="lightGray">Creator</Text>
        <Text>{sliceString(creator?.name || '')}</Text>
      </div>
    </div>
    <div className={styles.user}>
      {Array.isArray(owners) ? (
        <>
          <Link to={`/profile/${owners[0].id}`} className={styles.avatarWrapper}>
            <img src={owners[0].avatar} className={styles.avatar} alt="" />
          </Link>
          <div className={styles.text}>
            <Text color="lightGray">Owner</Text>
            <Text>{sliceString(owners[0].name)}</Text>
          </div>
        </>
      ) : (
        <>
          <Link to={`/profile/${owners?.id}`} className={styles.avatarWrapper}>
            <img src={owners?.avatar} className={styles.avatar} alt="" />
          </Link>
          <div className={styles.text}>
            <Text color="lightGray">Owner</Text>
            <Text>{sliceString(owners?.name || '')}</Text>
          </div>
        </>
      )}
    </div>
  </div>
);

export default AuthorComponent;
