import React, { FC } from 'react';
import cx from 'classnames';
import Tooltip from 'rc-tooltip';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { Button, Text } from 'components';
import { useMst } from 'store';
import { INft, IOwner, TNullable } from 'typings';

import styles from './styles.module.scss';
import 'rc-tooltip/assets/bootstrap.css';

import { ReactComponent as PinkHeart } from 'assets/img/pinkHeart.svg';
import transferImg from 'assets/img/icons/transfer.svg';
import removeImg from 'assets/img/icons/remove.svg';
import burnImg from 'assets/img/icons/burn.svg';
import reportImg from 'assets/img/icons/report.svg';
import { useLike } from 'hooks';
import linkIcon from 'assets/img/icons/link.svg';
import { numberFormatter } from 'utils';
import { routes } from '../../../../../appConstants';

type Props = {
  className?: string;
  likes: number;
  inStock?: number;
  nft: TNullable<INft>;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isWrongChain: boolean;
  tooltipPlacement?: 'top' | 'bottom';
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  inStock,
  nft,
  isOwner,
  tooltipPlacement = 'bottom',
  isUserCanRemoveFromSale,
  isWrongChain,
}) => {
  const {
    modals: { burn, remove, transfer, report },
    user,
  } = useMst();
  const { isLike, likeCount, handleLike } = useLike(
    !!nft?.is_liked,
    likes,
    nft?.id,
    !!user.address,
  );

  const [isTooltipVisible, setTooltipVisible] = React.useState(false);

  const handleActionEvent = React.useCallback((event: () => void) => {
    setTooltipVisible(false);
    event();
  }, []);

  const handleBurn = React.useCallback(() => {
    burn.open(nft?.id || 0, nft?.standart || '');
  }, [burn, nft]);

  const handleRemoveFromSale = React.useCallback(() => {
    remove.open(nft?.id || 0);
  }, [remove, nft]);

  const handleTransfer = React.useCallback(() => {
    let available = 0;
    if (Array.isArray(nft?.owners)) {
      available =
        nft?.owners.find((owner: IOwner) => {
          return owner.id === user.id;
        })?.quantity || 0;
    } else {
      available = nft?.owners.quantity || 0;
    }
    transfer.open(nft?.id || 0, nft?.standart || '', available);
  }, [transfer, nft, user.id]);

  const handleReport = React.useCallback(() => {
    report.open();
  }, [report]);

  const actions = React.useMemo(
    () => [
      {
        name: 'Transfer Token',
        img: transferImg,
        event: () => handleActionEvent(handleTransfer),
        isVisible: isOwner && !isWrongChain,
      },
      {
        name: 'Remove from sale',
        img: removeImg,
        event: () => handleActionEvent(handleRemoveFromSale),
        isVisible: isUserCanRemoveFromSale,
      },
      {
        name: 'Burn token',
        img: burnImg,
        event: () => handleActionEvent(handleBurn),
        isVisible: isOwner && !isWrongChain,
      },
      {
        name: 'Report',
        img: reportImg,
        event: () => handleActionEvent(handleReport),
        isVisible: true,
      },
    ],
    [
      handleActionEvent,
      handleBurn,
      isOwner,
      handleRemoveFromSale,
      isUserCanRemoveFromSale,
      handleTransfer,
      handleReport,
      isWrongChain,
    ],
  );

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(`${window.location.origin}${routes.nft.link(nft?.id || '')}`);
    toast.info('Copied to Clipboard');
  }, [nft]);

  return (
    <>
      <div className={cx(styles.viewsAndControls, className)}>
        {inStock ? <Text color="gray">{`In Stock: ${inStock}`}</Text> : null}
        <div className={styles.controls}>
          <Button
            className={cx(styles.likeButton, { [styles.likeButtonActive]: isLike })}
            onClick={handleLike}
            color="outline"
          >
            <PinkHeart />
            {numberFormatter(likeCount || 0, 1000)}
          </Button>
          <Button onClick={handleCopy} color="outline">
            <img src={linkIcon} alt="" />
          </Button>
          <Tooltip
            visible={isTooltipVisible}
            animation="zoom"
            trigger="click"
            overlay={
              <div className={styles.actions}>
                {actions.map((action) => {
                  if (action.isVisible) {
                    return (
                      <div
                        key={action.name}
                        className={styles.actionsItem}
                        onClick={action.event}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => {}}
                      >
                        <img src={action.img} alt="" />
                        <span>{action.name}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            }
            onVisibleChange={(value) => setTooltipVisible(value)}
            placement={tooltipPlacement}
          >
            <Button className={styles.button} color="outline">
              <Text className={styles.dots}>...</Text>
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default observer(ViewsAndControlsComponent);
