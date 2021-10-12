import { FC } from 'react';
import cx from 'classnames';

import { Button, Text } from 'components';

import styles from './styles.module.scss';

import { ReactComponent as PinkHeart } from '../../../../../assets/img/pinkHeart.svg';
import { useLike } from 'hooks';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

type Props = {
  className?: string;
  likes: number;
  views: number;
  link: string;
  inStock?: number;
  dotsAction: () => void;
  isLiked?: boolean;
  id?: number | string;
};

const ViewsAndControlsComponent: FC<Props> = observer(
  ({ className, likes, views, inStock, dotsAction, isLiked = false, link, id }) => {
    const { user } = useMst();
    const { isLike, likeCount, handleLike } = useLike(isLiked, likes, id, !!user.address);

    return (
      <div className={cx(styles.viewsAndControls, className)}>
        <Text>{`Views: ${views}`}</Text>
        {inStock && <Text color="gray">{`In Stock: ${inStock}`}</Text>}
        <div className={styles.controls}>
          <Button
            className={cx(styles.likeButton, { [styles.likeButtonActive]: isLike })}
            onClick={handleLike}
            color="outline"
          >
            <PinkHeart />
            {likeCount}
          </Button>
          <Button onClick={() => alert(link)} color="outline">
            link
          </Button>
          <Button onClick={dotsAction} color="outline">
            ...
          </Button>
        </div>
      </div>
    );
  },
);

export default ViewsAndControlsComponent;
