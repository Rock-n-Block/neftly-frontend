import React, { FC } from 'react';
import cx from 'classnames';

import { Button, Text } from 'components';

import styles from './styles.module.scss';

import { ReactComponent as PinkHeart } from '../../../../../assets/img/pinkHeart.svg';

type Props = {
  className?: string;
  likes: number;
  views: number;
  link: string;
  inStock?: number;
  dotsAction: () => void;
  likeAction: () => void;
  isLiked?: boolean;
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  views,
  inStock,
  dotsAction,
  isLiked = false,
  link,
  likeAction,
}) => {
  const [isLike, setIsLike] = React.useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);

  const handleLike = React.useCallback(() => {
    setIsLike(!isLike);
    if (isLike) {
      setLikeCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    } else {
      setLikeCount((prev) => prev + 1);
    }
    likeAction();
  }, [isLike, likeAction]);

  React.useEffect(() => {
    setIsLike(isLiked);
  }, [isLiked]);

  React.useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

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
};

export default ViewsAndControlsComponent;
