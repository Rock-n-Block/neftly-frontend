import { FC } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  likes: number;
  views: number;
  likeAction: () => void;
  link: string;
  dotsAction: () => void;
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  views,
  likeAction,
  link,
  dotsAction,
}) => (
  <div className={cx(styles.viewsAndControls, className)}>
    <Text>{`Views: ${views}`}</Text>
    <div className={styles.controls}>
      <Button onClick={likeAction} color="outline">
        {likes} likes
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
