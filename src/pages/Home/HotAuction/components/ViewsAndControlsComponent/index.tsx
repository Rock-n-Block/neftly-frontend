import { FC, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';
// import { toast } from 'react-toastify';

import { Button, Copyable, Text } from 'components';
import { useMst } from 'store';
import { INft, IOwner, TNullable } from 'typings';
import { ReactComponent as Share } from 'assets/img/NFTPreview/Share.svg';
import { ReactComponent as Options } from 'assets/img/NFTPreview/Options.svg';
import iconBurn from 'assets/img/NFTPreview/Burn.svg';
import iconTransfer from 'assets/img/NFTPreview/Transfer.svg';
import iconRemove from 'assets/img/NFTPreview/Remove.svg';
import iconReport from 'assets/img/NFTPreview/Report.svg';
import iconChange from 'assets/img/NFTPreview/Change_price.svg';

import styles from './styles.module.scss';
import 'rc-tooltip/assets/bootstrap.css';

import {
  PinkHeart,
} from 'assets/img';
import { useLike } from 'hooks';
import { numberFormatter } from 'utils';
import { routes } from 'appConstants';
import OptionMenu, { positionOptions } from 'components/OptionMenu';

const viewsCount = 10;

type Props = {
  className?: string;
  likes: number;
  inStock?: number;
  nft: TNullable<INft>;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isWrongChain: boolean;
  isUserCanChangePrice: boolean;
  tooltipPlacement?: positionOptions;
};

const ViewsAndControlsComponent: FC<Props> = ({
  className,
  likes,
  inStock,
  nft,
  isOwner,
  tooltipPlacement,
  isUserCanRemoveFromSale,
  isWrongChain,
  isUserCanChangePrice,
}) => {
  const {
    modals: { burn, remove, transfer, report, change },
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

  const handleChangePrice = useCallback(() => {
    change.open(nft?.id || 0);
  }, [change, nft]);

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
        name: 'Change Price',
        img: iconChange,
        event: () => handleActionEvent(handleChangePrice),
        isVisible: isUserCanChangePrice,
        class: 'blue',
      },
      {
        name: 'Transfer Token',
        img: iconTransfer,
        event: () => handleActionEvent(handleTransfer),
        isVisible: isOwner && !isWrongChain,
        class: 'blue',
      },
      {
        name: 'Remove from sale',
        img: iconRemove,
        event: () => handleActionEvent(handleRemoveFromSale),
        isVisible: isUserCanRemoveFromSale,
        class: 'blue',
      },
      {
        name: 'Burn token',
        img: iconBurn,
        event: () => handleActionEvent(handleBurn),
        isVisible: isOwner && !isWrongChain,
        class: 'red'
      },
      {
        name: 'Report',
        img: iconReport,
        event: () => handleActionEvent(handleReport),
        isVisible: true,
        class: 'blue'
      },
    ],
    [
      isUserCanChangePrice,
      isOwner,
      isWrongChain,
      isUserCanRemoveFromSale,
      handleActionEvent,
      handleChangePrice,
      handleTransfer,
      handleRemoveFromSale,
      handleBurn,
      handleReport,
    ],
  );

  // const handleCopy = useCallback(() => {
  //   navigator.clipboard.writeText(`${window.location.origin}${routes.nft.link(nft?.id || '')}`);
  //   toast.info('Copied to Clipboard');
  // }, [nft]);

  return (
    <>
      <div className={cx(styles.viewsAndControls, className)}>
        {viewsCount ? <Text size='m' color="gray" className={styles.viewsData}>{`Views: ${viewsCount}`}</Text> : null}
        {inStock ? <Text size='m' color="gray">{`In Stock: ${inStock}`}</Text> : null}
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
              <Share />
            </Button>
          </Copyable>

          <div className={styles.optionBtn}>
            <Button className={styles.button} color="outline" onClick={() => setTooltipVisible(!isTooltipVisible)}>
              <Options />
            </Button>
            <OptionMenu active={isTooltipVisible} position={tooltipPlacement}>
              <div className={styles.actions}>
                {actions.map((action) => {
                  if (action.isVisible) {
                    return (
                      <div
                        key={action.name}
                        className={`${styles.actionsItem} ${styles[action.class]}`}
                        onClick={action.event}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => { }}
                      >
                        <img src={action.img} alt="" />
                        <span>{action.name}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </OptionMenu>
          </div>

        </div>
      </div>
    </>
  );
};

export default observer(ViewsAndControlsComponent);
