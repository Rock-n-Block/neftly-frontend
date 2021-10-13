import { FC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';
import { sliceString } from 'utils';

type Props = {
  className?: string;
  authorPic: string;
  author: string;
};

const AuthorComponent: FC<Props> = ({ className, authorPic, author }) => (
  <div className={cx(styles.authorBlock, className)}>
    <div className={styles.avatarWrapper}>
      <img src={authorPic} alt="" />
    </div>
    <Text>{`by ${sliceString(author)}`}</Text>
  </div>
);

export default AuthorComponent;
