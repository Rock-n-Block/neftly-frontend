import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import Actions from '../../../components/Actions';
import Icon from '../../../components/Icon';
import { userApi } from '../../../services/api';

import styles from './Options.module.scss';

interface IOptionsProps {
  className?: string;
  isLiked: boolean;
  itemId?: string;
  standart?: string;
  isMayRemoveFromSale: boolean;
  isOwner: boolean;
  isAuction: boolean;
  removeFromSale: () => Promise<any>;
}

const Options: React.FC<IOptionsProps> = ({
  className,
  isLiked,
  itemId,
  standart,
  isMayRemoveFromSale,
  isAuction,
  isOwner,
  removeFromSale,
}) => {
  const [isLike, setIsLike] = useState(isLiked);
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };
  const fetchLike = useCallback(() => {
    userApi.like({ id: itemId ? +itemId : 0 });
  }, [itemId]);
  return (
    <div className={cn(styles.options, className)}>
      <button
        type="button"
        className={cn('button-circle-stroke', styles.button)}
        onClick={handleClose}
      >
        <img alt="go back" src="/images/content/cross-gradient.svg" />
      </button>
      <button
        type="button"
        className={cn(
          'button-circle-stroke',
          isLiked && 'button-circle-stroke-active',
          styles.button,
        )}
      >
        <Icon name="share" size="24" />
      </button>
      <button
        type="button"
        className={cn('button-circle-stroke', styles.button, styles.favorite, {
          [styles.active]: isLike,
        })}
        onClick={() => {
          setIsLike(!isLike);
          fetchLike();
        }}
      >
        <Icon name="heart-fill" size="24" />
      </button>
      <Actions
        className={styles.actions}
        isAuction={isAuction}
        standart={standart}
        itemId={itemId}
        isMayRemoveFromSale={isMayRemoveFromSale}
        isOwner={isOwner}
        removeFromSale={removeFromSale}
      />
    </div>
  );
};

export default Options;
