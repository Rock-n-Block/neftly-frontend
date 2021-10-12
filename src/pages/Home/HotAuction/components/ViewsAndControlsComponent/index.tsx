import React, { FC } from 'react';
import cx from 'classnames';
import Tooltip from 'rc-tooltip';
import { observer } from 'mobx-react-lite';

import { Button, Text } from 'components';
import { useMst } from '../../../../../store';
import { INft } from 'typings';

import styles from './styles.module.scss';
import 'rc-tooltip/assets/bootstrap.css';

import { ReactComponent as PinkHeart } from '../../../../../assets/img/pinkHeart.svg';
import transferImg from '../../../../../assets/img/icons/transfer.svg';
import removeImg from '../../../../../assets/img/icons/remove.svg';
import burnImg from '../../../../../assets/img/icons/burn.svg';
import reportImg from '../../../../../assets/img/icons/report.svg';

type Props = {
  className?: string;
  likes: number;
  views: number;
  link: string;
  inStock?: number;
  likeAction: () => void;
  isLiked?: boolean;
  nft: INft | null;
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  views,
  inStock,
  isLiked = false,
  link,
  likeAction,
  nft,
}) => {
  const {
    modals: { burn },
  } = useMst();
  const [isLike, setIsLike] = React.useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);

  const [isTooltipVisible, setTooltipVisible] = React.useState(false);

  const handleActionEvent = React.useCallback((event: () => void) => {
    setTooltipVisible(false);
    event();
  }, []);

  const handleBurn = React.useCallback(() => {
    burn.open(nft?.id || 0, nft?.standart || '');
  }, [burn, nft]);

  const actions = React.useMemo(
    () => [
      {
        name: 'Transfer Token',
        img: transferImg,
        event: () => {},
      },
      {
        name: 'Remove from sale',
        img: removeImg,
        event: () => {},
      },
      {
        name: 'Burn token',
        img: burnImg,
        event: () => handleActionEvent(handleBurn),
      },
      {
        name: 'Report',
        img: reportImg,
        event: () => {},
      },
    ],
    [handleActionEvent, handleBurn],
  );

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
    <>
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
          <Tooltip
            visible={isTooltipVisible}
            animation="zoom"
            trigger="click"
            overlay={
              <div className={styles.actions}>
                {actions.map((action) => (
                  <div
                    className={styles.actionsItem}
                    onClick={action.event}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                  >
                    <img src={action.img} alt="" />
                    <span>{action.name}</span>
                  </div>
                ))}
              </div>
            }
            onVisibleChange={(value) => setTooltipVisible(value)}
            placement="bottom"
          >
            <Button color="outline">...</Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default observer(ViewsAndControlsComponent);
