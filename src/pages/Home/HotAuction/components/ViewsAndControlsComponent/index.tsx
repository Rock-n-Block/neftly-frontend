import { FC } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';
import { pinkHeart } from 'assets/img';

type Props = {
  className?: string;
  likes: number;
  views: number;
  inStock?: number;
  likeAction: () => void;
  link: string;
  dotsAction: () => void;
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  views,
  inStock,
  likeAction,
  link,
  dotsAction,
}) => (
  <div className={cx(styles.viewsAndControls, className)}>
    <Text>{`Views: ${views}`}</Text>
    {inStock && <Text color="gray">{`In Stock: ${inStock}`}</Text>}
    <div className={styles.controls}>
      <Button className={styles.likeButton} onClick={likeAction} color="outline">
        <img src={pinkHeart} alt="" />
        {likes}
      </Button>
      <Button onClick={() => alert(`open ${link}`)} color="outline">
        link
      </Button>
      <Button onClick={dotsAction} color="outline">
        ...
      </Button>
    </div>
  </div>
);

export default ViewsAndControlsComponent;
