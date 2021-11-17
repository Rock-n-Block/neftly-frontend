import { FC, useCallback, useMemo, useState } from 'react';
import { routes } from 'appConstants';
import { iconBurn, iconLink, iconRemove, iconReport, iconTransfer, PinkHeart } from 'assets/img';
import cx from 'classnames';
// import { toast } from 'react-toastify';
import { Button, Copyable, Text } from 'components';
import { useLike } from 'hooks';
import { observer } from 'mobx-react-lite';
import Tooltip from 'rc-tooltip';
import { useMst } from 'store';
import { INft, IOwner, TNullable } from 'typings';
import { numberFormatter } from 'utils';

import 'rc-tooltip/assets/bootstrap.css';
import styles from './styles.module.scss';

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

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleActionEvent = useCallback((event: () => void) => {
    setTooltipVisible(false);
    event();
  }, []);

  const handleBurn = useCallback(() => {
    let quantity = 0;
    if (isOwner && nft?.owners) {
      if (Array.isArray(nft.owners)) {
        quantity = nft.owners.filter((owner: any) => owner.id === user.id)[0].quantity;
      } else {
        quantity = nft.owners.quantity;
      }
    }
    burn.open(nft?.id || 0, nft?.standart || '', quantity);
  }, [burn, nft, isOwner, user.id]);

  const handleRemoveFromSale = useCallback(() => {
    remove.open(nft?.id || 0);
  }, [remove, nft]);

  const handleTransfer = useCallback(() => {
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

  const handleReport = useCallback(() => {
    report.open();
  }, [report]);

  const actions = useMemo(
    () => [
      {
        name: 'Transfer Token',
        img: iconTransfer,
        event: () => handleActionEvent(handleTransfer),
        isVisible: isOwner && !isWrongChain,
      },
      {
        name: 'Remove from sale',
        img: iconRemove,
        event: () => handleActionEvent(handleRemoveFromSale),
        isVisible: isUserCanRemoveFromSale,
      },
      {
        name: 'Burn token',
        img: iconBurn,
        event: () => handleActionEvent(handleBurn),
        isVisible: isOwner && !isWrongChain,
      },
      {
        name: 'Report',
        img: iconReport,
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

  // const handleCopy = useCallback(() => {
  //   navigator.clipboard.writeText(`${window.location.origin}${routes.nft.link(nft?.id || '')}`);
  //   toast.info('Copied to Clipboard');
  // }, [nft]);

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
          <Copyable valueToCopy={`${window.location.origin}${routes.nft.link(nft?.id || '')}`}>
            <Button color="outline" className={styles.copyButton}>
              <img src={iconLink} alt="" />
            </Button>
          </Copyable>
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
              <Text className={styles.dots}>&hellip;</Text>
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default observer(ViewsAndControlsComponent);
