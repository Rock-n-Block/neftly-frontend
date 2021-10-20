import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';
import { sliceString } from 'utils';
import { IOwner } from 'typings';

type Props = {
  className?: string;
  authorPic: string;
  author: string;
  owners?: IOwner | IOwner[] | undefined;
};

const AuthorComponent: FC<Props> = ({ className, authorPic, author, owners }) => (
  <div className={cx(styles.authorBlock, className)}>
    <div className={styles.user}>
      <div className={styles.avatarWrapper}>
        <img src={authorPic} className={styles.avatar} alt="" />
      </div>
      <div className={styles.text}>
        <Text color="lightGray">Creator</Text>
        <Text>{sliceString(author)}</Text>
      </div>
    </div>
    <div className={styles.user}>
      {Array.isArray(owners) ? (
        <>
          <div className={styles.avatarWrapper}>
            <img src={owners[0].avatar} className={styles.avatar} alt="" />
          </div>
          <div className={styles.text}>
            <Text color="lightGray">Owner</Text>
            <Text>{sliceString(owners[0].name)}</Text>
          </div>
        </>
      ) : (
        <>
          <div className={styles.avatarWrapper}>
            <img src={owners?.avatar} className={styles.avatar} alt="" />
          </div>
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
