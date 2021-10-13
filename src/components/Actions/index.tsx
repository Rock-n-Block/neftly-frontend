import { useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';

import Icon from '../Icon';
import Modal from '../Modal';
import Report from '../Report';

import styles from './Actions.module.scss';

interface IActionsProps {
  className?: string;
  itemId?: string;
  isMayRemoveFromSale: boolean;
  standart?: string;
  isOwner: boolean;
  isAuction: boolean;
  removeFromSale: () => Promise<any>;
}

const Actions: React.FC<IActionsProps> = ({
  className,
  itemId,
  standart,
  isMayRemoveFromSale,
  isOwner,
  removeFromSale,
  // isAuction,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);

  const items: Array<{
    title: string;
    icon: 'coin' | 'arrow-right-square' | 'close-circle' | 'info-circle';
    action: () => void;
    condition?: boolean;
  }> = [
    // {
    //   title: 'Change price',
    //   icon: 'coin',
    //   action: () => console.log('coin'),
    //   condition: isOwner && !isAuction,
    // },
    {
      title: 'Report',
      icon: 'info-circle',
      action: () => setVisibleModalReport(true),
      condition: true,
    },
  ];
  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(styles.actions, className, {
            [styles.active]: visible,
          })}
        >
          <button
            type="button"
            className={cn('button-circle-stroke', styles.button)}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="more" size="24" />
          </button>
          <div className={styles.body}>
            {items.map((x) => {
              return x.condition ? (
                <div
                  tabIndex={0}
                  onKeyDown={() => {}}
                  role="button"
                  className={styles.item}
                  key={nextId()}
                  onClick={x.action}
                >
                  <Icon name={x.icon} size="20" />
                  <span>{x.title}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </OutsideClickHandler>
      <Modal visible={visibleModalReport} onClose={() => setVisibleModalReport(false)}>
        <Report />
      </Modal>
    </>
  );
};

export default Actions;
